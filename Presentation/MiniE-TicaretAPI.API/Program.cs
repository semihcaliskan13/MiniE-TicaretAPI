
using MiniE_TicaretAPI.Persistence;
using MiniE_TicaretAPI.Infrastructure.Services.Storage.Azure;
using MiniE_TicaretAPI.Infrastructure;
using MiniE_TicaretAPI.Infrastructure.SqlTableDependency.Middleware;
using MiniE_TicaretAPI.Infrastructure.SqlTableDependency;
using MiniE_TicaretAPI.Domain.Entities;
using MiniE_TicaretAPI.Infrastructure.Hubs;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
    policy.WithOrigins("http://localhost:3000", "https://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials()//belirli bir urlden gelen istekleri al.
));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddCookie(x =>
    {
        x.Cookie.Name = "access_token";
    })
    .AddJwtBearer("User", options =>
    {
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateAudience = true,
            ValidateIssuer = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidAudience = builder.Configuration["Token:Audience"],
            ValidIssuer = builder.Configuration["Token:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:SecurityKey"]))

        };

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                context.Token = context.Request.Cookies["access_token"];
                return Task.CompletedTask;
            }
        };


    });
builder.Services.AddStorage<AzureStorage>();

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddPersistenceServices();
builder.Services.AddInfrastructureServices();
builder.Services.AddSignalR(e => {
    e.MaximumReceiveMessageSize = 102400000;
    e.EnableDetailedErrors = true;
});//Buradan core olmayanýný çaðýracaðýz.



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();

app.UseHttpsRedirection();
app.UseAuthentication();
app.MapControllers();
app.UseDatabaseSubscription<DatabaseSubscription<Offer>>("Offers");
app.UseRouting();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    
    endpoints.MapHub<ProductHub>("/productshub");
});

app.Run();
