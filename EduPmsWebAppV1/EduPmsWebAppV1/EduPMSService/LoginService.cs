using EduPMSServiceContracts.Exceptions;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EdduPMSIDAL;
using EduPMSDAL;
using EduPMSServiceContracts;
using EduPMSModel.LoginDTO;

namespace EduPMSService
{
    public class LoginService : ILoginService
    {
        /*Gives the  user details based on the username and ciphered password*/
        public UserDTO GetUserDetailsByUserNameAndHashPassword(string UserName, string Hashpassword)
        {
            UserDTO userDetails = new UserDTO();

            try
            {
                ILoginDAL loginDAL = new LoginDAL();
                userDetails = loginDAL.GetUserDetailsByUserNameAndHashPassword(UserName, Hashpassword);
            }
            catch(DbException exception)
            {
                throw new CredentialDBException(exception.ToString());
            }
            catch(ArgumentException exception)
            {
                throw new CredentialDBException(exception.ToString());
            }

            return userDetails;
        }
    }
}
