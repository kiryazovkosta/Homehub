using FluentValidation;
using FluentValidation.Results;

namespace HomeHub.Api.Controllers;

using Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DTOs.Bills;
using Microsoft.AspNetCore.Mvc.Infrastructure;

[ApiController]
[Route("api/bills")]
public sealed class BillsController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<BillsListCollectionResponse>> GetBills()
    {
        List<BillListResponse> finances = await dbContext
            .Bills
            .Select(BillQueries.ToListResponse())
            .ToListAsync();

        var response = new BillsListCollectionResponse
        {
            Items = finances
        };

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BillResponse>> GetBill(string id)
    {
        BillResponse? bill = await dbContext
            .Bills
            .Include(f => f.Category)
            .Where(f => f.Id == id)
            .Select(BillQueries.ToResponse())
            .FirstOrDefaultAsync();

        if (bill is null)
        {
            return NotFound();
        }

        return Ok(bill);
    }

    [HttpPost]
    public async Task<ActionResult<BillResponse>> CreateBill(
        [FromBody] CreateBillRequest request,
        IValidator<CreateBillRequest> validator,
        CancellationToken cancellationToken)
    {
        await validator.ValidateAndThrowAsync(request, cancellationToken);

        var category = await dbContext.Categories.FirstOrDefaultAsync(c => c.Id == request.CategoryId, cancellationToken);
        if (category is null)
        {
            return NotFound();
        }

        var bill = request.ToEntity(category);
        if (bill.CategoryId != request.CategoryId || bill.Category.Id != request.CategoryId)
        {
            return BadRequest();
        }

        dbContext.Bills.Add(bill);
        await dbContext.SaveChangesAsync(cancellationToken);
        BillResponse response = bill.ToResponse();
        return CreatedAtAction(nameof(GetBill), new { id = response.Id }, response);
    }

    [HttpPost("{id}/upload")]
    public ActionResult UploadFile(
        string id,
        IFormFile file)
    {
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateBill(
        string id,
        [FromBody] UpdateBillRequest request,
        IValidator<UpdateBillRequest> validator,
        CancellationToken cancellationToken)
    {
        await validator.ValidateAndThrowAsync(request, cancellationToken);

        var bill = await dbContext.Bills.FirstOrDefaultAsync(f => f.Id == id, cancellationToken);
        if (bill is null)
        {
            return NotFound();
        }

        if (bill.IsPaid)
        {
            return BadRequest();
        }

        bill.UpdateFromRequest(request);
        await dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpPatch("{id}/pay")]
    public async Task<ActionResult> PayBill(string id)
    {
        var bill = await dbContext.Bills.FirstOrDefaultAsync(t => t.Id == id);
        if (bill is null)
        {
            return NotFound();
        }

        bill.Pay();
        await dbContext.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteBill(string id)
    {
        var bill = await dbContext.Bills.FirstOrDefaultAsync(t => t.Id == id);
        if (bill is null)
        {
            return NotFound();
        }

        dbContext.Bills.Remove(bill);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }


}