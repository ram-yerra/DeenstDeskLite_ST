
Ext.define("DDLApp.view.SearchList", {
    extend: "Ext.Container",
    xtype: 'searchIncidentsList',
    id: 'idSearchIncList',
    requires:[
              'Ext.dataview.NestedList',
              'Ext.data.proxy.Memory',
              'Ext.data.TreeStore',
          ],
    alias:'widget.searchincidentslist',
    config: {
        id: 'idSearchIncidentList',
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
                                id: 'idSearchIncidentsListTitle',
                                title:"Welcome",
                            },
                            ]
                },
                {
                    xtype: "toolbar",
                    ui:'light',
                    docked:'top',
                    id:"idHeaderTwo",
                    cls:"clsHeaderTwo" ,
                        items: [
                                {   xtype: 'title' ,
                                    cls: 'clsLeftTitle',
                                    title: "Search",
                                },
                                {xtype:'spacer'},
                                ]
                },
                {
                    xtype:'fieldset',
                    ui:'light',
                    cls:'clsFieldsetSearch',
                    id:'idFieldsetSearch',
                    docked:'top',
                    items: [
                            {
                                xtype: "selectfield",
                                name: "TKT_STATUS_NAME",
                                cls: "vm_fieldFont",
                                label: "Status",
                                id: "idTicketStatus",
                                labelWidth:"43%",
                                valueField: "TKT_STATUS_NAME",
                                displayField: "TKT_STATUS_NAME",
                                options: "{TKT_STATUS_NAME: \'Select Status\',TKT_STATUS_ID:\'0\'}",
                                listeners: {            
                                    change:function(field, value) {
                                        var form = Ext.getCmp('idSearchIncidentList');
                                        
                                        form.setMasked({
                                            xtype:'loadmask',
                                            message:'Loading...'
                                        });
                                        
                                        var statusVal = Ext.getCmp('idTicketStatus').getValue();
                                        
                                        console.log(statusVal);
                                        
                                        var getIncidentData = localStorage.getItem('userIncidentData');
                                        var parseIncidentData = JSON.parse(getIncidentData);
                                        var searchedData = [{}];
                                        var searchArray = new Array();
                                        var searchStore = Ext.getCmp('idSearchList').getStore();
                                        if(statusVal == "Select Status")
                                            {
                                                if(localStorage.userIncidentData != '[""]')
                                                    {
                                                        searchStore.setData(localStorage.userIncidentData).load();
                                                        //Ext.getCmp('idSearchList').show();
                                                        Ext.getCmp('idSearchEmptyText').hide();
                                                    }
                                                else
                                                    {
                                                        //Ext.getCmp('idSearchList').hide();
                                                        Ext.getCmp("idSearchEmptyText").show();
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
                                                form.unmask();
                                            }
                                        else
                                            {
                                                for (var i=0,j=0; i < parseIncidentData.length; i++){
                                                    if((parseIncidentData[i].TKT_STATUS_NAME == statusVal) && parseIncidentData[i]!=undefined)
                                                        {
                                                                searchedData[0][j]= parseIncidentData[i];
                                                                searchArray[j] = searchedData[0][j];
                                                                j++;
                                                        }
                                                }
                                                searchStore.setData(searchArray).load();
                                                Ext.getCmp('idSearchEmptyText').hide();
                                                //Ext.getCmp('idSearchList').show();
                                                form.unmask();
                                            }
                                    }
                                }
                            }
                            ]
                },
                {
                    xtype: 'nestedlist',
                    id:'idSearchList',
                    //hidden:true,
                    toolbar:{
                        cls:'clsSearchToolbar',
                        id:'idSearchToolbar',
                        hidden:true
                    },
                    onItemDisclosure:true,
                    cls:'clsSearchNestedIncidentList',
                    loadingText: "Searching Incidents...",
                    emptyText: "<div class=\"empty-text\">No Incidents Found.</div>",
                    getItemTextTpl: function() {
                        var tplSearchConstructor =             
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
                        return tplSearchConstructor;
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
                        id: "idSearchIncidentDetails",
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
                            Ext.getCmp("idSearchToolbar").show();
                            this.getDetailCard().items.items[0].setHtml(post._data.TKT_SUBJECT);
                            this.getDetailCard().items.items[1].setHtml(post._data.TKT_DESC);
                            this.getDetailCard().items.items[2].setHtml(post._data.SEV_DESC);
                            this.getDetailCard().items.items[3].setHtml(post._data.SERVICE_NAME);
                            this.getDetailCard().items.items[4].setHtml(post._data.CATEGORY_NAME);
                        }
                    }
                }, 
                {html:'No Incidents Found....',id:'idSearchEmptyText'}],
    }, 
    initialize: function() {
        this.callParent(arguments);
        this.down("#idSearchEmptyText").hide();
        var incidentStore = Ext.getCmp('idSearchList').getStore();
        var getLoginData = localStorage.getItem('userData');
        var getStatusData = localStorage.getItem('statusData');
        var parseData = JSON.parse(getLoginData);
        var parseStatusData = JSON.parse(getStatusData);
        var fname = parseData[0].FIRST_NAME;
        this.down("#idSearchIncidentsListTitle").setTitle("Welcome, " + fname);
        
        var selectStatus = parseStatusData;
        var optionStatusArray = '[';
        optionStatusArray += '{TKT_STATUS_NAME: \'Select Status\',TKT_STATUS_ID: \'0\'},';
        for (var i=0; i < selectStatus.length; i++){
            optionStatusArray = optionStatusArray + '{TKT_STATUS_NAME: \''+selectStatus[i].TKT_STATUS_NAME+'\', TKT_STATUS_ID: \''+selectStatus[i].TKT_STATUS_ID+'\'},';
        }
        optionStatusArray = optionStatusArray.substr(0,optionStatusArray.length-1);
        optionStatusArray = optionStatusArray +']';
        this.down('#idTicketStatus').setOptions(optionStatusArray);
        
        if(localStorage.userIncidentData != '[""]')
            {
                Ext.getCmp("idSearchEmptyText").hide();
                incidentStore.setData(localStorage.userIncidentData).load();
            }
        else
            {
                this.down("#idSearchEmptyText").show();
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