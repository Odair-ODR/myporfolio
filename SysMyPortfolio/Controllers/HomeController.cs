using Azure.Identity;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Mvc;
using SysMyPortfolio.Models;
using System.Diagnostics;

namespace SysMyPortfolio.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult AboutMe()
        {
            if (Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                return PartialView();
            else
                return View();
        }

        [HttpGet]
        public IActionResult Contact()
        {
            if (Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                return PartialView();
            else
                return View();
        }

        public IActionResult Privacy()
        {
            return View("");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpGet]
        public async Task<IActionResult> DownloaCVFromAzure()
        {
            const string blobUri = "https://odrdatapersonal.blob.core.windows.net/odrdatapublic/cv/CV_OdairHuamaniConde.pdf";
            using (var client = new HttpClient())
            {
                using var response = await client.GetAsync(blobUri);
                byte[] fileContent = await response.Content.ReadAsByteArrayAsync();
                // Devuelve el archivo como un resultado de archivo
                return File(fileContent, "application/pdf", "CV_OdairHuamaniConde.pdf");
            };
        }
    }
}