using System.Security.Cryptography;

namespace HomeHub.Api.Services;

using Settings;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

public sealed class TokenProvider(IOptions<JwtAuthOptions> options)
{
    private readonly JwtAuthOptions _jwtAuthOptions = options.Value;
    
    public AccessTokensResponse GenerateTokens(TokenRequest request)
    {
        return new AccessTokensResponse
        {
            AccessToken = GenerateAccessToken(request),
            RefreshToken = GenerateRefreshToken()
        };
    }

    private string GenerateAccessToken(TokenRequest tokenRequest)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtAuthOptions.Key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512);

        List<Claim> claims =
        [
            new(JwtRegisteredClaimNames.Sub, tokenRequest.UserId),
            new(JwtRegisteredClaimNames.Email, tokenRequest.Email),
            new(JwtRegisteredClaimNames.NameId, tokenRequest.Id),
            ..tokenRequest.Roles.Select(role => new Claim(ClaimTypes.Role, role))
        ];
        
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(_jwtAuthOptions.ExpirationInMinutes),
            SigningCredentials = credentials,
            Issuer = _jwtAuthOptions.Issuer,
            Audience = _jwtAuthOptions.Audience
        };
        
        var handler = new JsonWebTokenHandler();
        string accessToken = handler.CreateToken(tokenDescriptor);
        return accessToken;
    }

    private static string GenerateRefreshToken()
    {
        byte[] randomBytes = RandomNumberGenerator.GetBytes(32);

        return Convert.ToBase64String(randomBytes);
    }
}