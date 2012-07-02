
Ext.define("DDLApp.view.MoreList", {
    extend: "Ext.Container",
    xtype: 'moreList',
    id: 'idMoreList',
    requires:[
              'Ext.dataview.NestedList',
              'Ext.data.proxy.Memory',
              'Ext.data.TreeStore',
          ],
    alias:'widget.morelist',
    config: {
        id: 'idMoreView',
        layout:'fit',
        items: [
                {
                    xtype: "toolbar",
                    docked: "top",
                    cls:'clsDDLHeader',
                    items: [
                            {xtype:'spacer'},
                            {   xtype: 'title' ,
                                title:"Welcome",
                                id:'idMoreTitle',
                                cls: 'clsRightTitle',
                            },
                            ]
                },
                {
                    xtype: "toolbar",
                    ui:'light',
                    id:"idHeaderTwo",
                    cls:"clsHeaderTwo" ,
                        items: [
                                {   xtype: 'title' ,
                                    title: "More",
                                    cls: 'clsLeftTitle',
                                },
                                {xtype:'spacer'}
                                ]
                },
                {
                    xtype: 'navigationview',
                    id:'idMoreNavigationView',

                    //inside this first item we are going to add a button
                    items: [
                            {
                                xtype:'list',
                                store:'MoreStore',
                                itemTpl:'<div class="vm_dvMore">{name}</div>',
                                listeners: {
                                    itemtap: function(list,index,target,record){
                                        console.log(index);
                                        //check if it's about view
                                        if(index==0)
                                            {
                                                Ext.Viewport.setMasked({ xtype: "loadmask", message: "Loading..."});
                                                var moreView= Ext.getCmp('idMoreNavigationView');
                                                moreView.push({
                                                        //this one also has a title
                                                        html: '<br><div align ="center"><b>Deenst Desk Lite</b></div><br><div class="well"><div align ="center"><img src="imgs/ddl.png"/></div><br><div align ="center"><table><tr><td style="font-weight: bold;font-size: 0.65em;">Developed With :  </td><td  style="font-weight: normal;font-size: 0.65em;"> PhoneGap & Sencha Touch 2.0 </td></tr><tr><td  style="font-weight: bold;font-size: 0.65em;">Developed By : </td> <td  style="font-weight: normal;font-size: 0.65em;"><a href="http://www.vmokshagroup.com/" target="_blank"> VMOKSHA TECHNOLOGIES </a></td></tr><tr><td  style="font-weight: bold;font-size: 0.65em;">Version : </td><td  style="font-weight: normal;font-size: 0.65em;"> Alpha </td></tr><tr><td  style="font-weight: bold;font-size: 0.65em;">Source code : </td><td  style="font-weight: normal;font-size: 0.65em;"> SVN DeenstDeskLite-Sencha Touch 2 </td></tr></table></div></div>',
                                                    });
                                                Ext.Viewport.setMasked(false);
                                            }
                                        
                                        else if(index==1)
                                            {
                                                Ext.Viewport.setMasked({ xtype: "loadmask", message: "Loading..."});
                                                var userName = localStorage.getItem('userName');
                                                var userPwd = localStorage.getItem('userPassword');
                                                var msgMore = new Ext.MessageBox();
                                                onLoad();
                                                if(onDeviceReady())
                                                {
                                                    Ext.util.JSONP.request({
                                                        url: DDLApp.app.oneTimeServiceUrl,
                                                        dataType: "jsonp",
                                                        params: {
                                                            type:'fetch',
                                                            username:userName,
                                                            password:userPwd
                                                        },
                                                        success: function (result) {
                                                          //if username and password matches
                                                            if(result.Success == true)
                                                            {                                                
                                                                 //setLocalStorage(result);
                                                                 var userIncidentData = localStorage.setItem('userIncidentData',JSON.stringify(result.Data.incidentList));
                                                                 var incidentStore = Ext.getCmp("idIncidentList").getStore();
                                                                 incidentStore.setData(localStorage.userIncidentData).load();
                                                                 Ext.Viewport.setMasked(false);
                                                                 msgMore.show({
                                                                     title: 'SYNC',
                                                                     message: 'Data Synchronized Successfully',
                                                                     cls: 'vm_success',
                                                                     showAnimation: 'fadeIn',
                                                                     hideAnimation: 'fadeOut',
                                                                     buttons: [{text:'OK',itemId:'ok'}],
                                                                     fn:function(){
                                                                         Ext.emptyFn();
                                                                     }
                                                                 });
                                                                 Ext.getCmp("idMain").setActiveItem(0);
                                                            }
                                                            else{
                                                                Ext.Viewport.setMasked(false);
                                                                msgMore.show({
                                                                    title: 'SYNC ERROR',
                                                                    message: 'Unable to fetch incidents to list!',
                                                                    ui:'light',
                                                                    cls: 'vm_error',
                                                                    buttons: [{text:'OK',itemId:'ok'}],
                                                                    fn:function(){
                                                                        Ext.emptyFn();
                                                                    }
                                                                });
                                                                //Ext.getCmp("idMain").setActiveItem(0);
                                                            }
                                                        }
                                                    });
                                                }
                                                ////If network is not present
                                                else
                                                {
                                                    Ext.Viewport.setMasked(false);
                                                    msgMore.show({
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
                                        //else check if it's logout view
                                        //TODO: Screen going blank/ need to check
                                        else if(index==2)
                                            {
                                            Ext.Viewport.setMasked({ xtype: "loadmask", message: "Loading..."});
                                            //alert logout
                                            var logVal = localStorage.getItem('rememberUser');
                                            console.log(logVal);
                                            var msg = new Ext.MessageBox();
                                            //var msg = '';
                                            if(logVal == 1)
                                                {
                                                    localStorage.setItem('rememberUser',0);
                                                    var getLoggedInData = localStorage.getItem('rememberUserLogged');
                                                    var parseLoggedInData = JSON.parse(getLoggedInData);
                                                    /*var userName = parseLoggedInData[0].EMAIL;
                                                    var password = parseLoggedInData[0].EMAIL;
                                                    Ext.getCmp('idUserName').setValue('userName');
                                                    Ext.getCmp('idPassword').setValue('password');*/
                                                    Ext.Viewport.setMasked(false);
                                                    msg.show({
                                                        title: 'Logout',
                                                        message: 'Logged Out Successfully!',
                                                        ui:'light',
                                                        cls: 'vm_success',
                                                        showAnimation: 'fadeIn',
                                                        hideAnimation: 'fadeOut',
                                                        buttons: [{text:'OK',itemId:'ok'}],
                                                        fn:function(){
                                                            this.down('#idUserName').setValue(userName);
                                                            this.down('#idPassword').setValue(userPwd);
                                                            window.location.reload();
                                                        }
                                                    });
                                                }
                                            else 
                                                {
                                                    Ext.Viewport.setMasked(false);
                                                    msg.show({
                                                        title: 'Logout',
                                                        message: 'Logged Out Successfully!',
                                                        ui:'light',
                                                        cls: 'vm_success',
                                                        showAnimation: 'fadeIn',
                                                        hideAnimation: 'fadeOut',
                                                        buttons: [{text:'OK',itemId:'ok'}],
                                                        fn:function(){
                                                            window.location.reload();
                                                        }
                                                    });
                                                }
                                            }
                                    },
                                }
                                    
                            },
                        ],                    
                }],
    }, 
    initialize: function() {
        var getLoginData = localStorage.getItem('userData');
        var parseData = JSON.parse(getLoginData);
        var fname = parseData[0].FIRST_NAME;
        this.down("#idMoreTitle").setTitle("Welcome, " + fname);
     },
});