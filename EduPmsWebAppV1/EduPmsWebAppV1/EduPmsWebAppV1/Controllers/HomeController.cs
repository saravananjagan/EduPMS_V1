using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace EduPmsWebAppV1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];

            //if ticket not expired
            if (authCookie != null)
            {
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                if (!ticket.Expired)
                {
                    return RedirectToAction("EduPMSHome");
                }
            }
            return View();
        }        

        public ActionResult EduPMSHome()
        {
            HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];

            //if ticket expired
            if (authCookie != null)
            {
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                if (ticket.Expired)
                {
                    return RedirectToAction("Index");
                }
            }
            //if cache cleared
            else
            {
                return RedirectToAction("Index");
            }
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}