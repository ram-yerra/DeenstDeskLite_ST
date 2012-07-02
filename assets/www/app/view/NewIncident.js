/* Description: New Incident View
* Created On: 
* Created By: Ram
* Last Modified On: 
* Last Modified By:Nikhil, Nikhil(May 23rd 2012)
* Last Modified Reason: Added Header and comments, Added form Validations
* TODO:
*/
Ext.define("DDLApp.view.NewIncident", {
    extend: 'Ext.form.Panel',
    xtype: 'newIncident',
    alias: "widget.newincidentview",
    config: {
        id:'createIncident',
        scrollable: 'vertical',
        items: [
                {
                    xtype: "toolbar",
                    docked: "top",
                    cls:'clsDDLHeader',
                    items: [
                            {xtype:'spacer'},
                            {   xtype: 'title' ,
                                cls: 'clsRightTitle',
                                id: 'idNewIncidentTitle',
                                title:"Welcome",
                            },
                            ]
                },
            {
                xtype: "toolbar",
                docked: "top",
                ui:'light',
                id:"idHeaderTwo",
                cls:"clsHeaderTwo",
                items: [
                        {   xtype: 'title' ,
                            cls: 'clsLeftTitle',
                            title: "New Incident", 
                        },
                        { xtype: 'spacer' },
                        ]
            }, 
            { xtype: "fieldset",
                
                items: [
                    {
                        xtype: 'textfield',
                        name: 'subject',
                        cls: 'vm_fieldFont',
                        label: 'Subject',
                        labelWidth:'32%',
                        required: true
                    },
                    {
                        xtype: 'textareafield',
                        name: 'description',
                        cls: 'vm_fieldFont',
                        label: 'Description',
                        labelWidth:'32%',
                        required: true
                    },
                    {
                        xtype: 'selectfield',
                        name: 'SEV_DESC',
                        cls: 'vm_fieldFont',
                        id: 'idImpact', 
                        label: 'Impact',
                        labelWidth:'32%',
                        required: true,
                        valueField: 'SEV_ID',
                        displayField: 'SEV_DESC',
                    },
                    {
                        xtype: 'selectfield',
                        name: 'SERVICE_NAME',
                        cls: 'vm_fieldFont',
                        id:'displayIncidentType',
                        label: 'Inci. Type',
                        labelWidth:'32%',
                        required: true,
                        valueField: 'SER_ID',
                        displayField: 'SERVICE_NAME',
                        listeners: {            
                            change:function(field, value) {
                                var getCategoryData = localStorage.getItem('categoryData');
                                var parseCategoryData = JSON.parse(getCategoryData);
                                var selectCategory = parseCategoryData;
                                var optionCategoryArray = '[';
                                optionCategoryArray += '{CATEGORY_NAME: \'Select a category\',CATEGORY_ID: \'0\'},';
                                for (var i=0; i < selectCategory.length; i++){
                                    if(selectCategory[i].SER_ID == value)
                                            {
                                                optionCategoryArray = optionCategoryArray + '{CATEGORY_NAME: \''+selectCategory[i].CATEGORY_NAME+'\', CATEGORY_ID: \''+selectCategory[i].CATEGORY_ID+'\'},';
                                            }
                                }
                                optionCategoryArray = optionCategoryArray.substr(0,optionCategoryArray.length-1);
                                optionCategoryArray = optionCategoryArray +']';
                                Ext.getCmp('displayCategory').setOptions(optionCategoryArray);
                            }
                        }
                    },
                    {
                        xtype: 'selectfield',
                        name:'CATEGORY_NAME',
                        label: 'Category',
                        cls: 'vm_fieldFont',
                        id:'displayCategory',
                        labelWidth:'32%',
                        required: true,
                        valueField: 'CATEGORY_ID',
                        displayField: 'CATEGORY_NAME',
                        options: '{CATEGORY_NAME: \'Select Category\',CATEGORY_ID:\'0\'}',
                    },
                    {
                        xtype: 'button',
                        text: 'Create',
                        ui: 'confirm',
                        cls: 'btnCreate',
                        width:'35%',
                        handler: function() {
                            ui: 'confirm',
                            console.log('storing');
                            var form = Ext.getCmp('createIncident');
                            var subj = form.getValues().subject;
                            var desc = form.getValues().description;
                            var impct = form.getValues().SEV_DESC;
                            var inciType = form.getValues().SERVICE_NAME;
                            var cat = form.getValues().CATEGORY_NAME; 
                            //Create and instance to validate form elements                           
                            /*var instance = Ext.create('DDLApp.model.Incident', {
                                TKT_SUBJECT: subj,
                                TKT_DESC: desc
                            });*/
                            
                            var msgNew = new Ext.MessageBox();
                            //Validate and store errors 
                            //var errors=instance.validate();
                            //variable for error message
                            var errormsg='';
                            //Loop through all elements
                            /*if (!errors.isValid()) {
                                errors.each(function (err) {
                                    errormsg += err.getMessage() + '<br/>';
                                });*/
                            if (subj == '' || desc == '' || impct == 0 || inciType == 0 || cat ==0)
                                {
                                if(subj == '')
                                    {errormsg += 'Subject is required' + '<br/>';}
                                if(desc == '')
                                    {errormsg += 'Description is required' + '<br/>';}
                                if(impct == 0)
                                    {errormsg += 'Impact is required' + '<br/>';}
                                if(inciType == 0)
                                    {errormsg += 'Inci. Type is required' + '<br/>';}
                                if(cat == 0)
                                    {errormsg += 'Category is required' + '<br/>';}
                                msgNew.show({
                                    title: 'CREATE INCIDENT ERROR',
                                    message: errormsg,
                                    ui:'light',
                                    cls: 'vm_error',
                                    showAnimation: 'fadeIn',
                                    hideAnimation: 'fadeOut',
                                    buttons: [{text:'OK',itemId:'ok'}],
                                    fn:function(){
                                        Ext.emptyFn();
                                    }
                                });
                            } else {
                                form.setMasked({
                                    xtype:'loadmask',
                                    message:'Loading...'
                                });
                                var getLoginData = localStorage.getItem('userData');
                                var parseData = JSON.parse(getLoginData);
                                var userID = parseData[0].USER_ID;
                                Ext.util.JSONP.request({
                                    url: DDLApp.app.baseUrl,
                                    dataType: "jsonp",
                                    params: {
                                        type: 'insert', //Parameter for URL
                                        subject: subj,
                                        desc: desc,
                                        impact: impct,
                                        incidentType: inciType,
                                        category: cat,                                 
                                        userId: userID                                   
                                    },
                                    success: function (result) {
                                        var userName = localStorage.getItem('userName');
                                        var userPwd = localStorage.getItem('userPassword');
                                        if(result.Success == true)
                                        {  
                                            msgNew.show({
                                                title: 'CREATE INCIDENT',
                                                message: 'Created Incident Successfully',
                                                cls: 'vm_success',
                                                showAnimation: 'fadeIn',
                                                hideAnimation: 'fadeOut',
                                                buttons: [{text:'OK',itemId:'ok'}],
                                                fn:function(){
                                                    Ext.emptyFn();
                                                }
                                            });
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
                                                         Ext.getCmp("inclist").show();
                                                         var incidentStore = Ext.getCmp('idIncidentList').getStore();
                                                         incidentStore.setData(localStorage.userIncidentData).load();
                                                         form.unmask();
                                                         Ext.getCmp("idMain").setActiveItem(0);
                                                         var autoClear = Ext.getCmp('createIncident');
                                                         autoClear.reset();
                                                    }
                                                    else{
                                                        form.unmask();
                                                        msgNew.show({
                                                            title: 'CREATE INCIDENT ERROR',
                                                            message: 'No Network connection to fetch incident to list!',
                                                            ui:'light',
                                                            cls: 'vm_error',
                                                            buttons: [{text:'OK',itemId:'ok'}],
                                                            fn:function(){
                                                                Ext.emptyFn();
                                                            }
                                                        });
                                                        form.unmask();
                                                        Ext.getCmp("idMain").setActiveItem(0);
                                                        var autoClear = Ext.getCmp('createIncident');
                                                        autoClear.reset();
                                                    }
                                                }
                                            });
                                        }
                                        else{
                                            msgNew.show({
                                                title: 'CREATE INCIDENT ERROR',
                                                message: 'No Network connection!',
                                                ui:'light',
                                                cls: 'vm_error',
                                                buttons: [{text:'OK',itemId:'ok'}],
                                                fn:function(){
                                                    Ext.emptyFn();
                                                }
                                            });
                                        }
                                    }
                                });
                            }

                        },
                    },
                    {
                        xtype: 'button',
                        text: 'Clear',
                        ui: 'confirm',
                        cls: 'btnReset',
                        width:'35%',
                        style: 'background:#4A4245;',
                        handler: function() {
                            this.up('formpanel').reset();
                            this.down("#idSearchList").hide();
                            
                        },
                    }
            ]
            },
        ],
    },
    initialize: function() {
        var getLoginData = localStorage.getItem('userData');
        var getImpactData = localStorage.getItem('impactData');
        var getIncidentTypeData = localStorage.getItem('incidentTypeData');
        
        var parseData = JSON.parse(getLoginData);
        var parseImpactData = JSON.parse(getImpactData);
        var parseIncidentTypeData = JSON.parse(getIncidentTypeData);

        var fname = parseData[0].FIRST_NAME;
        
        this.down("#idNewIncidentTitle").setTitle("Welcome, " + fname);
        
        var selectImpact = parseImpactData;
        var optionImpactArray = '[';
        optionImpactArray += '{SEV_DESC: \'Select Impact\',SEV_ID: \' \'},';
        for (var i=0; i < selectImpact.length; i++){
            optionImpactArray = optionImpactArray + '{SEV_DESC: \''+selectImpact[i].SEV_DESC+'\', SEV_ID: \''+selectImpact[i].SEV_ID+'\'},';
        }
        optionImpactArray = optionImpactArray.substr(0,optionImpactArray.length-1);
        optionImpactArray = optionImpactArray +']';
        this.down('#idImpact').setOptions(optionImpactArray);
        
        var selectIncidentType = parseIncidentTypeData;
        var optionIncidentArray = '[';
        optionIncidentArray += '{SERVICE_NAME: \'Select Inci. Type\',SER_ID: \' \'},';
        for (var i=0; i < selectIncidentType.length; i++){
            optionIncidentArray = optionIncidentArray + '{SERVICE_NAME: \''+selectIncidentType[i].SERVICE_NAME+'\', SER_ID: \''+selectIncidentType[i].SER_ID+'\'},';
        }
        optionIncidentArray = optionIncidentArray.substr(0,optionIncidentArray.length-1);
        optionIncidentArray = optionIncidentArray +']';
        this.down('#displayIncidentType').setOptions(optionIncidentArray);

     },

});

