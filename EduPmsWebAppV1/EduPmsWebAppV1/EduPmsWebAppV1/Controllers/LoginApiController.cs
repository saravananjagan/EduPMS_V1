using CredCipherService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using EduPMSProxy;
using EduPMSServiceContracts.Exceptions;
using EduPMSModel.LoginDTO;
using Newtonsoft.Json.Linq;
using System.Web.Security;

namespace EduPmsWebAppV1.Controllers
{
    public class LoginApiController : ApiController
    {
        #region Public Methods
        [HttpPost]
        [Route("api/ValidateCredentials")]
        public IHttpActionResult CheckCredentials(JObject CredjObject)
        {
            string UserName = ""; string Password = "";
            dynamic credsInput = CredjObject;
            if (CredjObject != null)
            {
                UserName = credsInput.UserName;
                Password = credsInput.Password;
            }
            bool isValidCredential = false;
            UserDTO userDetails = new UserDTO();
            try
            {
                string HashPassword = CipherService.GetCipherCreds(Password);
                userDetails = LoginProxy.GetUserDetailsByUserNameAndHashPassword(UserName, HashPassword);
                if (userDetails != null)
                {
                    isValidCredential = true;                    
                }
            }
            catch (CredentialDBException exceptions)
            {

                isValidCredential = false;
            }
            catch (Exception e)
            {
                isValidCredential = false;
            }

            return Ok(isValidCredential);
        }
        #endregion
        #region Private Methods
        private void SetAuthentication(string UserName, string UserId)
        {
            FormsAuthentication.SetAuthCookie(UserName, false);
        }
        #endregion
    }
}