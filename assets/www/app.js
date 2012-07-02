/* Description: App.js/ Declare all models, stores, controllers and views here
* Created On: 
* Created By: Ram
* Last Modified On: 
* Last Modified By:Nikhil
* Last Modified Reason: Added Header and comments
* TODO:
*/
Ext.application({
    name: "DDLApp",
    
    baseUrl: "http://59.144.5.168:85/DDL-ST2WebService/DeenstDeskServiceInsertData.php",
    //baseUrl: "http://10.10.5.30:85/DDL-ST2WebService/DeenstDeskServiceInsertData.php",
    
    oneTimeServiceUrl: "http://59.144.5.168:85/DDL-ST2WebService/DeenstDeskServiceFetchData.php",
    //oneTimeServiceUrl: "http://10.10.5.30:85/DDL-ST2WebService/DeenstDeskServiceFetchData.php",
    
    user:"",
    pwd:"",
    
    //declare models, stores, controllers and views here
    models: ["MoreModel"],
    stores: ["MoreStore"],
    //loads the required views and defines the configuration needed for app’s overall layout
    views: ["IncidentsList", "NewIncident", "Main", "Login", "SettingsView","MoreList", "SearchList"],
    //create a variable for each view
    launch: function () {
        var mainPageView = {
            xtype: "maincontent"
        };

        var loginPageView = {
                xtype: "formLogin"
            };
        //localStorage.setItem('rememberUser',0);
        var remMe = localStorage.getItem('rememberUser');
        
        if(remMe != null)
        {
            if(remMe == 1)
            {
                var getRememberData = localStorage.getItem('rememberUserLogged');
                localStorage.setItem('userData',getRememberData);
                document.getElementById("dvLoading").style.display = "none";
                Ext.Viewport.add([mainPageView]);
            }
            else
            {
                document.getElementById("dvLoading").style.display = "none";
                Ext.Viewport.add([loginPageView]); 
            }
        }
        else
        {
            document.getElementById("dvLoading").style.display = "none";
            Ext.Viewport.add([loginPageView]); 
            localStorage.setItem('rememberUser',0);
        }
        //Set default view to mainPageView

    }
});