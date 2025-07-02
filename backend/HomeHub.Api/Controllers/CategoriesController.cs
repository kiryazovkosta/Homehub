using HomeHub.Api.Database;
using HomeHub.Api.Entities;
using HomeHub.Api.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeHub.Api.Controllers;

[ApiController]
[Route("api/categories")]
public sealed class CategoriesController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<Category>> GetCategories()
    {
        List<Category> categories = await dbContext
            .Categories
            //.Select(FinanceQueries.ToListResponse())
            .ToListAsync();

        //var response = new FinancesListCollectionResponse
        //{
        //    Items = finances
        //};

        //var items = EnumHelper.GetAllEnumItems<CategoryType>();

        return Ok(categories);
    }

    [HttpGet("types")]
    public ActionResult GetCategoryTypes()
    {

        var items = EnumHelper.GetAllEnumItems<CategoryType>();

        return Ok(items);
    }
}