export const StaffType = [
    { id: 'admin', name: 'Admin' },
    { id: 'user', name: 'User' },
    { id: 'guest', name: 'Guest' },
    { id: 'manager', name: 'Manager' },
    { id: 'waiter', name: 'Waiter' },
    { id: 'staff', name: 'Staff' },
    { id: 'kitchen_manager', name: 'Kitchen Manager' },
    { id: 'counter_attendant', name: 'Counter Attendant' },
]
// user_type_dict = {'admin': 1, 'user': 2, 'guest': 3, 'manager': 4, 'waiter': 5, 'staff': 6, 'kitchen_manager':7, 'app user':8,'counter_attendant':9}
export const SalaryDisbursement = [
    { id: 'Hourly', name: 'Hourly' },
    { id: 'Daily', name: 'Daily' },
    { id: 'Weekly', name: 'Weekly' },
    { id: 'Monthly', name: 'Monthly' }
]
//salary_disbursement = ChoiceField(choices=['Hourly', 'Daily', 'Weekly', 'Monthly'], required=True, allow_null=False)

export const experience = [
    { id: 'No Experience', name: 'No Experience' },
    { id: 'Entry Level', name: 'Entry Level' },
    { id: 'Intermediate', name: 'Intermediate' },
    { id: 'Professional', name: 'Professional' }];
//experience = ChoiceField(choices=['No Experience', 'Entry Level', 'Intermediate', 'Professional']

export const JobShift = [
 { id:"Morning", name:"Morning"},
 { id:"Lunch", name:"Lunch"},
 { id:"Early Dinner", name:"Early Dinner"},
 { id:"Late Dinner", name:"Late Dinner"}
]

// job_shift = ChoiceField(choices=['Morning', 'Lunch', 'Early Dinner', 'Late Dinner'], required=True, allow_null=False)