using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduPMSServiceContracts.Exceptions
{
    /*This exception is needed for the credential related operations.*/
    [Serializable]
    public class CredentialDBException : Exception
    {
        public CredentialDBException()
        {

        }
        public CredentialDBException(string ExceptionDetails)
            :base(string.Format("Getting {0} exception while fetching user data",ExceptionDetails))
        {

        }
    }
}
