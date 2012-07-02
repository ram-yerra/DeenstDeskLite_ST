/* Description: Login View
* Created On:
* Created By: Ram
* Last Modified On: 
* Last Modified By:Nikhil
* Last Modified Reason: Added Header and comments
* TODO: To write a function on click to open a xtype/Do it through controller
*/
Ext.define("DDLApp.view.Login", {
    //extent panel class
    extend: "Ext.form.Panel",
    //DOM in fieldset
    requires: "Ext.form.FieldSet",
    xtype: 'formLogin',
    id:'loginForm',
    config: {
        scrollable: 'vertical',
        id: 'login',
        items: [
            {
                xtype: "toolbar",
                docked: "top",
            },
            {
                xtype: "toolbar", //Toolbar with heading as login
                docked: "top",
                title: "Login",
                ui:'light',
                id:"idHeaderTwo",
                cls:"clsLoginHeader"                
            }, 
            {
                xtype: 'textfield', //textfield for username
                name: 'Username',
                required: true,
                id:"idUserName",
                cls:"clsUserName",
                useClearIcon: false
           },
            {
                xtype: 'passwordfield', //textfield for password
                name: 'password',
                required: true,
                id:"idPassword",
                cls:"clsPassword",
                useClearIcon: false
            },
            {
                xtype: 'button', //Login button
                text: 'Login',
                ui: 'confirm',
                cls:'btnLogin',
                width:'30%',
                handler: function(SuccessFlag) { //Login button handler
                    ui: 'confirm',
                    console.log('Login Button pressed');
                    var form = Ext.getCmp('login');
                    
                    //get username and password from form elements
                    var user = form.getValues().Username;
                    var pwd = form.getValues().password;
                    
                    var msg = new Ext.MessageBox();
                    
                    onLoad();
                    
                    if(user == "" || pwd == "")
                    {
                        var errMsg = '';
                        if(user == "")
                            {
                                errMsg+= 'Username is required<br/>';
                            }
                        if(pwd == "")
                            {
                                errMsg+= 'Password is required';
                            }
                        msg.show({
                            title: 'LOGIN ERROR',
                            message: errMsg,
                            ui:'light',
                            cls: 'vm_error',
                            showAnimation: 'fadeIn',
                            hideAnimation: 'fadeOut',
                            buttons: [{text:'OK',itemId:'ok'}],
                            fn:function(){
                                Ext.emptyFn();
                            }
                        });
                    }                  
                    else 
                    {
                        form.setMasked({
                            xtype:'loadmask',
                            message:'Loading...'
                        });
                    
                        //Check for network connectivity
                        if(onDeviceReady())
                        {
                        //Fire a json service
                        Ext.util.JSONP.request({
                            url: DDLApp.app.oneTimeServiceUrl,
                            dataType: "jsonp",
                            params: {
                                type:'fetch',
                                username:user,
                                password:pwd
                            },
                            success: function (result) {
                              //if username and password matches
                                if(result.Success == true)
                                {                                                
                                     //setLocalStorage(result);
                                     DDLApp.app.user = user;
                                     DDLApp.app.pwd = pwd;
                                     localStorage.setItem('userName',user);
                                     localStorage.setItem('userPassword',pwd);
                                     localStorage.setItem('totalData',JSON.stringify(result.Data));
                                     localStorage.setItem('userData',JSON.stringify(result.Data.user));
                                     localStorage.setItem('userIncidentData',JSON.stringify(result.Data.incidentList));
                                     localStorage.setItem('impactData',JSON.stringify(result.Data.impact));
                                     localStorage.setItem('incidentTypeData',JSON.stringify(result.Data.incident_type));
                                     localStorage.setItem('categoryData',JSON.stringify(result.Data.category));
                                     localStorage.setItem('statusData',JSON.stringify(result.Data.statusDropdown));

                                     var indexPanel = Ext.create('DDLApp.view.Main');
                                     Ext.Viewport.add(indexPanel);
                                     Ext.Viewport.setActiveItem(indexPanel,{type: 'slide', direction: 'right'});
                                     form.unmask();
                                }
                                else{
                                    msg.show({
                                        title: 'LOGIN ERROR',
                                        message: 'Invalid Username/Password',
                                        ui:'light',
                                        cls: 'vm_error',
                                        showAnimation: 'fadeIn',
                                        hideAnimation: 'fadeOut',
                                        buttons: [{text:'OK',itemId:'ok'}],
                                        fn:function(){
                                            Ext.emptyFn();
                                        }
                                    });
                                    form.unmask();
                                }
                            }
                        });
                        }
                        ////If network is not present
                        else
                        {
                            form.unmask();
                            msg.show({
                                title: 'NETWORK CONNECTION ERROR',
                                message: "We're Sorry but it appears your device is not connected to the internet . Please check your internet settings and try again.",
                                ui:'light',
                                cls: 'vm_error',
                                showAnimation: 'fadeIn',
                                hideAnimation: 'fadeOut',
                                buttons: [{text:'Retry',itemId:'retry'}],
                                fn:function(){
                                    window.location.reload();
                                }
                            });
                        }
                    }
                },
            },
            {
                xtype: 'button', //clear button
                text: 'Clear',
                width:'30%',
                ui: 'confirm',
                cls:'btnClear',
                style: 'background:#4A4245;',
                handler: function() {
                    this.up('formpanel').reset(); //reset all form elements
                },
            }
        ]
    },
    initialize: function() {
        this.down('#idUserName').setValue('ramy@vmokshagroup.com');
        this.down('#idPassword').setValue('Power@1234');
     },
});

