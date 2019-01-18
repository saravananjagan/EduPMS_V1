using EduPMSModel.LoginDTO;
using EduPMSService;
using EduPMSServiceContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPMSProxy
{
    public static class LoginProxy
    {
        public static UserDTO GetUserDetailsByUserNameAndHashPassword(string UserName, string Hashpassword)
        {
            UserDTO userDetails = new UserDTO();
            ILoginService loginService = new LoginService();
            userDetails = loginService.GetUserDetailsByUserNameAndHashPassword(UserName, Hashpassword);
            return userDetails;
        }
    }
}
