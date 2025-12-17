using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/test")]
public sealed class TestController : ControllerBase
{
    [HttpGet("ping")]
    public async Task<ActionResult<string>> Ping()
    {
        return Ok("Pong");
    }
}   