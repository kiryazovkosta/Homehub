using System.Collections;

namespace HomeHub.Api.Services;

public sealed record TokenRequest(string UserId, string Email, string Id, IEnumerable<string> Roles);