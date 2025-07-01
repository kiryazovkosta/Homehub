using HomeHub.Api.Database;
using HomeHub.Api.DTOs.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeHub.Api.Controllers;

[ApiController]
[Route("api/tasks")]
public sealed class TasksController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<TasksListCollectionResponse>> GetTasks()
    {
        List<TaskListResponse> tasks = await dbContext
            .Tasks
            .Select(TaskQueries.ToListResponse())
            .ToListAsync();

        var response = new TasksListCollectionResponse
        {
            Items = tasks
        };

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskResponse>> GetTask(string id)
    {
        TaskResponse? task = await dbContext
            .Tasks
            .Where(t => t.Id == id)
            .Select(TaskQueries.ToResponse())
            .FirstOrDefaultAsync();

        if (task is null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<TaskResponse>> CreateTask(
        [FromBody] CreateTaskRequest request,
        CancellationToken cancellationToken)
    {
        var task = request.ToEntity();
        dbContext.Tasks.Add(task);
        await dbContext.SaveChangesAsync(cancellationToken);
        TaskResponse response = task.ToResponse();
        return CreatedAtAction(nameof(GetTask), new { id = response.Id }, response);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateTask(
        string id,
        [FromBody] UpdateTaskRequest request,
        CancellationToken cancellationToken)
    {
        var task = await dbContext.Tasks.FirstOrDefaultAsync(t => t.Id == id, cancellationToken);
        if (task is null)
        {
            return NotFound();
        }

        task.UpdateFromRequest(request);
        await dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTask(string id)
    {
        var task = await dbContext.Tasks.FirstOrDefaultAsync(t => t.Id == id);
        if (task is null)
        {
            return NotFound();
        }

        dbContext.Tasks.Remove(task);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }

}