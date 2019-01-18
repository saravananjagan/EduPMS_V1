# EduPMS_V1
Screens to be done and the description
. Login Screen - done
. Register as User - to be developed - features => i. Creates Users
. Manage Users - to be developed - features => i. manage the user details except the credentials
. Manage Tenants - to be developed - features => i. manage tenant details(Product Admin)
. Manage Roles - to be developed - features => i. manage Roles details(Tenant Admin)
. Manage Members - to be developed - features => i. manage members details of the organization(Tenant Admin)
. Product Admin Screen - to be developed - features => i. Enable Entities and Modules to tenants
. Tenant Admin Screen - to be developed - features => i. Enable Modules to Roles ii. Manage Members

Internal DB Design
. User Table for credentials and the UserId -Login Screen-done
. TenantDetails table -all screens-done
. Entity Table for maintaining Entity details
. Module Table for Module Details -Product Admin ,Tenant Admin, manage module details
. TenantEntity Table for mapping tenant details with the entities and modules
. Accessibility Table for View, Edit and Delete Accessibility permissions
. Role Table for role details -Product Admin, Tenant Admin, manage role details
. UserRole for mapping user with roles -Product Admin, Tenant Admin, manage role details, Create User
. RoleAccessibility table for mapping roles with Entity,Module and the Accessibility privilege token
. UserAccessibility table for mapping users with specific accessibility other than the actual accessibility given for the respective role the user has.