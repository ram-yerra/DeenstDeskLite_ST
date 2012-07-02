/* Description: More Store/ Stores the data locally
* Created On:
* Created By: Ram
* Last Modified On: 
* Last Modified By:Nikhil
* Last Modified Reason: Added Header and comments
* TODO:
*/
Ext.define("DDLApp.store.MoreStore", {
    extend: "Ext.data.Store",
    config: {
        model: "DDLApp.model.MoreModel",
        data:[
                {
                    name: 'About'
                },
                {
                    name: 'Sync'
                },
                {
                    name: 'Logout'
                }
        ],
    }
});