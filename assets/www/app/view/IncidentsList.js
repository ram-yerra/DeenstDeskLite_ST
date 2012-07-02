/* Description: Incident list view/ View to show list of incidents
* Created On: 
* Created By: Ram
* Last Modified On: 
* Last Modified By:Nikhil
* Last Modified Reason: Added Header and comments
* TODO: 
*/

Ext.define("DDLApp.view.IncidentsList", {
    extend: "Ext.Container",
    xtype: 'incidentsList',
    id: 'idIncList',
    requires:[
              'Ext.dataview.NestedList',
              'Ext.data.proxy.Memory',
              'Ext.data.TreeStore',
          ],
    alias:'widget.incidentslist',
    config: {
        id: 'idIncidentList',
        layout:'fit',
        items: [
                {
                    xtype: "toolbar",
                    docked: "top",
                    cls:'clsDDLHeader',
                    items: [
                            {xtype:'spacer'},
                            {   xtype: 'title' ,
                                cls: 'clsRightTitle',
                                id: 'idIncidentsListTitle',
                                title:"Welcome",
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
                                    cls: 'clsLeftTitle',
                                    title: "My Incidents",
                                },
                                {xtype:'spacer'}
                                ]
                },
                {
                    xtype: 'nestedlist',
                    id:'idIncidentList',
                    onItemDisclosure:true,
                    cls:'clsNestedIncidentList',
                    toolbar:{id:'idNestedIncidentList'},
                    loadingText: "Loading Incidents...",
                    emptyText: "<div class=\"empty-text\">No Incidents Found.</div>",
                    getItemTextTpl: function() {
                        var tplConstructor =             
                            '<tpl if="TKT_STATUS_NAME == \'CLOSED\'">'+
                            '<div class="vm_statusRed">'+
                            '</tpl>'+
                            '<tpl if="TKT_STATUS_NAME == \'OPENED\'">'+
                            '<div class="vm_statusYellow">'+
                            '</tpl>'+
                            '<tpl if="TKT_STATUS_NAME == \'ASSIGNED\'">'+
                            '<div class="vm_statusGreen">'+
                            '</tpl>'+
                            '<tpl if="TKT_STATUS_NAME == \'PENDING\'">'+
                            '<div class="vm_statusRed">'+
                            '</tpl>'+
                            '<tpl if="TKT_STATUS_NAME == \'RESOLVED\'">'+
                            '<div class="vm_statusOrange">'+
                            '</tpl>'+
                            '<tpl if="TKT_STATUS_NAME == \'REOPEN\'">'+
                            '<div class="vm_statusYellow">'+
                            '</tpl>'+
                            '<div class="vm_dvList"><h4 class="vm_txtName"><span class="vm_listHeader"><label>Inci.#{TKT_ID} by </label><label class="vm_txtFirstName"><i>{FIRST_NAME:ellipsis(15, true)}</i></label></span><div class="date vm_clsDate">{CREATED_ON:date("d-M-y H:i")}</div></h4>'+
                            '<div class="vm_title">{TKT_SUBJECT}</div>'+
                            '<div class="vm_subDesc">{TKT_DESC}</div></div></div>';
                        return tplConstructor;
                    },
        
                    store: {
                        type: 'tree',
        
                        fields: ['TKT_ID', 'CREATED_ON', 'FIRST_NAME', 'TKT_STATUS_NAME', 'TKT_SUBJECT', 'TKT_DESC', 'SEV_DESC', 'SERVICE_NAME', 'CATEGORY_NAME', {
                            name: 'leaf',
                            defaultValue: true
                        }],
        
                        root: {
                            leaf: false
                        },
        
                        proxy: {
                            type: 'memory',
                            reader: {
                                type: 'json',
                            }
                        }
                    },
        
                    detailCard: {
                        xtype: "fieldset",
                        scrollable: true,
                        id: "idIncidentDetails",
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'TKT_SUBJECT',
                                label: 'Subject',
                                labelAlign: 'top',
                                cls:'vm_textFields',
                                clearIcon:false,
                                disabled:true
                            },
                            {
                                xtype: 'textareafield',
                                name: 'TKT_DESC',
                                label: 'Description',
                                labelAlign: 'top',
                                cls:'vm_textFields',
                                clearIcon:false,
                                disabled:true
                            },
                            {
                                xtype: 'textfield',
                                name: 'SEV_DESC',
                                label: 'Impact',
                                labelWidth:'45%',
                                cls:'vm_textFields',
                                clearIcon:false,
                                disabled:true
                            },
                            {
                                xtype: 'textfield',
                                name: 'SERVICE_NAME',
                                id:'displayIncident',
                                cls:'vm_textFields',
                                label: 'IncidentType',
                                labelWidth:'45%',
                                disabled:true
                            },
                            {
                                xtype: 'textfield',
                                label: 'Category',
                                name: 'CATEGORY_NAME',
                                cls:'vm_textFields',
                                id:'getCategory',
                                labelWidth:'45%',
                                disabled:true
                            },
                    ],
                    },
        
                    listeners: {
                        itemtap: function(nestedList, list, index, element, post) {
                            this.getDetailCard().items.items[0].setHtml(post._data.TKT_SUBJECT);
                            this.getDetailCard().items.items[1].setHtml(post._data.TKT_DESC);
                            this.getDetailCard().items.items[2].setHtml(post._data.SEV_DESC);
                            this.getDetailCard().items.items[3].setHtml(post._data.SERVICE_NAME);
                            this.getDetailCard().items.items[4].setHtml(post._data.CATEGORY_NAME);
                        }
                    }
                }, 
                {html:'<div style="padding-top:35px;">No Incidents Found....</div>',id:'idEmptyText'}],
    }, 
    initialize: function() {
        this.callParent(arguments);
        var incidentStore = Ext.getCmp('idIncidentList').getStore();
        Ext.getCmp("idEmptyText").hide();
        var getLoginData = localStorage.getItem('userData');
        var parseData = JSON.parse(getLoginData);
        var fname = parseData[0].FIRST_NAME;
        var getIncidentData = localStorage.getItem('userIncidentData');
        var parseIncidentData = JSON.parse(getIncidentData);
        this.down("#idIncidentsListTitle").setTitle("Welcome, " + fname);
        if(localStorage.userIncidentData != '[""]')
            {
                Ext.getCmp("idEmptyText").hide();
                incidentStore.setData(localStorage.userIncidentData).load();
            }
        else
            {
                this.down("#idIncidentList").hide();
                this.down("#idEmptyText").show();
                var msg = new Ext.MessageBox();
                msg.show({
                    title: 'NO INCIDENTS FOUND',
                    message: 'No Incidents have reported by this user',
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
    },
});