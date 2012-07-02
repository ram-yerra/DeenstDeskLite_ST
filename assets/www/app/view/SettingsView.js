/* Description: Settings View
* Created On: 
* Created By: Ram
* Last Modified On: 
* Last Modified By:Nikhil
* Last Modified Reason: Added Header and comments
* TODO:
*/
Ext.define("DDLApp.view.SettingsView", {
    extend: "Ext.Container",
    xtype:"settingview",
    config: {
        id: 'idSetting',
        layout: {
            type: 'fit'
        },
        items: [{
            xtype: "toolbar",
            cls:"clsHeader",
            docked: "top",
            items: [
                    {xtype:'spacer'},
                    {   xtype: 'title' ,
                        cls: 'clsRightTitle',
                        id: 'idSettingTitle',
                        title:"Welcome",
                    },
                    ]
        },
        {
            xtype:"toolbar",
            docked:"top",
            ui:"light",
            cls:"clsHeaderTwo",
            items: [
                    {   xtype: 'title' ,
                        cls: 'clsLeftTitle',
                        title:"Settings",  
                    },
                    {xtype: 'spacer'},
                    ]
        },
        {
            xtype: "fieldset",
            items:  [{
            xtype:"togglefield",
            cls:'clsToggle',
            id:'idToggle',
            name:"Toggle",
            label:'Keep me logged in?',
            labelWidth:'45%',
            style:"font-size:0.8em;",
            value: 0,                        
            listeners: {            
                change:function(value) {
                    var val = Ext.getCmp("idToggle").getValues();
                    console.log(val);
                    localStorage.setItem("rememberUser",val);
                    if(val == 1)
                        localStorage.setItem("rememberUserLogged",localStorage.getItem('userData'));
                    else
                        localStorage.removeItem("rememberUserLogged"); 
                }
            }
            }]
        },
     ]},
     
     initialize: function() {
         var getLoginData = localStorage.getItem('userData');
         var parseData = JSON.parse(getLoginData);
         var fname = parseData[0].FIRST_NAME;
         var rememberVal = localStorage.getItem("rememberUser");
         this.down("#idToggle").setValue(rememberVal);
         this.down("#idSettingTitle").setTitle("Welcome, " + fname);
     },
});
