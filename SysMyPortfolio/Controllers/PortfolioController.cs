using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SysMyPortfolio.App;
using SysMyPortfolio.Models;

namespace SysMyPortfolio.Controllers
{
    public class PortfolioController : Controller
    {
        // GET: PortfolioController
        public ActionResult Index()
        {
            if (Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                return PartialView();
            else
                return View();
        }

        // GET: PortfolioController/Details/5
        public IActionResult Details(int id)
        {
            GlobalWebApp.Id = id;
            if (Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                return PartialView(GlobalWebApp.ProyectDetailModel);
            else
                return View(GlobalWebApp.ProyectDetailModel);
        }
    }
}
