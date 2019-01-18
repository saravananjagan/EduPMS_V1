using EduPMSModel.LoginDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPMSServiceContracts
{
    public interface ILoginService
    {
        /*Gives the  user details based on the username and ciphered password*/
        UserDTO GetUserDetailsByUserNameAndHashPassword(string UserName, string Hashpassword);
    }
}
