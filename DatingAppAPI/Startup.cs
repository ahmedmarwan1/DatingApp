using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Models.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using DatingApp.API.Helpers;
using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Newtonsoft.Json.Serialization;
using AutoMapper;
using DatingApp.API.Data;

namespace DatingApp.API
{
    public class Startup
    {

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var key = Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value);
            services.AddDbContext<DataContext>( x => x.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
            
            services.AddCors(options =>
        {
            options.AddPolicy(name: MyAllowSpecificOrigins,
                              builder =>
                              {
                                  builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                              });
        });

            
            //services.AddControllers();
            services.AddCors();
            services.AddAutoMapper();
            services.AddTransient<Seed>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IDatingRepository, DatingRepository>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
    
            services.AddControllers().AddNewtonsoftJson(Options => 
            {
                Options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            services.AddMvc();
            services.AddScoped<LogUserActivity>();
            services.AddMvc(options =>
            {
                options.SuppressAsyncSuffixInActionNames = false;
            });
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, Seed seeder)
        {
            IWebHostEnvironment env1 = env;
            if (env1.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(builder =>{
                    builder.Run( async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if(error != null)
                        {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
            }
            //seeder.SeedUsers();
            //app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            // app.UseMvc();

            app.UseHttpsRedirection();

            app.UseRouting();

             app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowCredentials());
            // app.UseMvc();

        }
    }
}
