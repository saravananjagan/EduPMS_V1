using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using EdduPMSIDAL;
using EduPMSDAL.Edmx;
using EduPMSModel.LoginDTO;

namespace EduPMSDAL
{
    
    public class LoginDAL : ILoginDAL
    {
        private edupms_DemoDBEntities EduPMSDB = new edupms_DemoDBEntities();
        #region Public Methods
        /*Gives the  user details based on the username and ciphered password*/
        public UserDTO GetUserDetailsByUserNameAndHashPassword(string UserName, string Hashpassword)
        {
            User UserIdentityDataEntityModel = new User();
            UserDTO UserIdentityData = new UserDTO();
            UserIdentityDataEntityModel = EduPMSDB.Users.Where(w => w.User_UserName == UserName && w.User_Password == Hashpassword).Select(s => s).FirstOrDefault();
            UserIdentityData=UserIdentityDataReader(UserIdentityDataEntityModel);
            return UserIdentityData;
        }
        #endregion
        #region Private Methods
        private UserDTO UserIdentityDataReader(User userdetail)
        {
            UserDTO UserIdentityData = new UserDTO();
            if (userdetail != null)
            {
                UserIdentityData.User_ID = userdetail.User_ID;
                UserIdentityData.User_TenantID = userdetail.User_TenantID;
                UserIdentityData.User_UserName = userdetail.User_UserName;
                UserIdentityData.User_EmailID = userdetail.User_EmailID;
                UserIdentityData.User_Comment = userdetail.User_Comment;
                UserIdentityData.User_Password = userdetail.User_Password;
                UserIdentityData.User_PasswordQuestion = userdetail.User_PasswordQuestion;
                UserIdentityData.User_PasswordAnswer = userdetail.User_PasswordAnswer;
                UserIdentityData.User_IsApproved = userdetail.User_IsApproved;
                UserIdentityData.User_LastActivityDate = userdetail.User_LastActivityDate;
                UserIdentityData.User_LastLoginDate = userdetail.User_LastLoginDate;
                UserIdentityData.User_LastPasswordChangedDate = userdetail.User_LastPasswordChangedDate;
                UserIdentityData.User_CreationDate = userdetail.User_CreationDate;
                UserIdentityData.User_IsLockedOut = userdetail.User_IsLockedOut;
                UserIdentityData.User_LastLockedOutDate = userdetail.User_LastLockedOutDate;
                UserIdentityData.User_FailedPasswordAttemptCount = userdetail.User_FailedPasswordAttemptCount;
                UserIdentityData.User_FailedPasswordAttemptWindowStart = userdetail.User_FailedPasswordAttemptWindowStart;
                UserIdentityData.User_FailedPasswordAnswerAttemptCount = userdetail.User_FailedPasswordAnswerAttemptCount;
                UserIdentityData.User_FailedPasswordAnswerAttemptWindowStart = userdetail.User_FailedPasswordAnswerAttemptWindowStart;
                UserIdentityData.User_Status = userdetail.User_Status;
                UserIdentityData.User_IsFirstTimeUser = userdetail.User_IsFirstTimeUser;
                UserIdentityData.User_IsUserPasswordChangeForced = userdetail.User_IsUserPasswordChangeForced;
            }            
            return UserIdentityData;
        }
        #endregion
    }
    

}
