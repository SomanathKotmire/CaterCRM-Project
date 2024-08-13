

using Microsoft.EntityFrameworkCore;
using RecipeManagerProject.Context;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ProjectDBContext>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("DbConStr")));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers().AddNewtonsoftJson(options =>
options.SerializerSettings.ReferenceLoopHandling =
Newtonsoft.Json.ReferenceLoopHandling.Ignore); 

var app = builder.Build();
app.UseStaticFiles();
app.UseRouting();
app.MapControllers();
app.UseCors(option=>option.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}





app.Run();


