/**
 * Created by liuzheng on 4/12/16.
 */

import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import  'rxjs/Rx';
declare var jQuery:any;
declare var layer:any;

import {NavComponent} from '../ngnav';
import {LeftbarComponent} from '../leftbar';
import {NavcatbarComponent} from '../nav_cat_bar';
import {User, AppService} from '../service';
import {Logger} from "angular2-logger/core";

@Component({
    selector: 'ng-body',
    template: `<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-sm-10">
            <div class="ibox float-e-margins">

                <div class="ibox-title">
                    <h5> 查看用户组</h5>
                    <div class="ibox-tools">
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i class="fa fa-wrench"></i>
                        </a>
                        <a class="close-link">
                            <i class="fa fa-times"></i>
                        </a>
                    </div>
                </div>

                <div class="ibox-content">
                    <div class="">
                    <a href="{% url 'user_group_add' %}" class="btn btn-sm btn-primary "> 添加用户组 </a>
                    <a id="del_btn" class="btn btn-sm btn-danger "> 删除所选 </a>
                    <form id="search_form" method="get" action="" class="pull-right mail-search">
                        <div class="input-group">
                            <input type="text" class="form-control input-sm" id="search_input" name="search" placeholder="Search">
                            <div class="input-group-btn">
                                <button id='search_btn' type="submit" class="btn btn-sm btn-primary">
                                    -搜索-
                                </button>
                            </div>
                        </div>
                    </form>
                    </div>

                    <table id="editable" class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th class="text-center">
                                    <input type="checkbox" id="select_all" name="select_all">
                                </th>
                                <th class="text-center">组名</th>
                                <th class="text-center">成员数目</th>
                                <th class="text-center">备注</th>
                                <th class="text-center">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="gradeX" *ngFor="group in grouplist">
                                <td class="text-center">
                                    <input class="shiftCheckbox" type="checkbox"  name="selected" [(ngModel)]="group.id">
                                </td>
                                <td class="text-center" [(ngModel)]="group.name"></td>
                                <td class="text-center">
                                    <a href="{% url 'user_list' %}?gid={{ group.id }}" [(ngModel)]="group.membercount"></a>
                                </td>
                                <td class="text-center" [(ngModel)]="group.comment"></td>
                                <td class="text-center">
                                    <a class="btn btn-xs btn-info" (click)="groupEdit(group.id)">编辑</a>
                                    <a class="btn btn-xs btn-danger del" (click)="groupDelete(group.id)">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row">
                        <!--div class="col-sm-6">
                            <div class="dataTables_info" id="editable_info" role="status" aria-live="polite">
                                Showing {{ user_groups.start_index }} to {{ user_groups.end_index }} of {{ p.count }} entries
                            </div>
                        </div-->
                       <!-- TODO: paginator-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    `,
    directives: [ROUTER_DIRECTIVES]
})

export class Grouplist {
    data:{};
    groups:Array;

    constructor(private http:Http,
                private _router:Router,
                private _logger:Logger,
                private _appService:AppService) {
        this._appService.getGrouplist().subscribe(response => {
            this.groups = response;
            this._logger.log('grouplist.ts:Grouplist,constructor')
            this._logger.debug(response)
        });
    }

    ngOnInit() {
        // this._appService.getMyinfoFromServer().subscribe(response => {
        //     this.user = response;
        //     this._logger.log('dashboard.ts:Dashboard,ngOnInit')
        //     this._logger.debug(response)
        //     this._appService.setMyinfo(this.user);
        // });

    }

    ngAfterViewInit() {

        // this.user = this._appService.getMyinfo()
        // this._logger.log('dashboard.ts:Dashboard,ngAfterViewInit');
        // this._logger.log(this._appService.getMyinfo())

    }

    groupEdit(id:number) {
        // TODO: router
    }
    
    groupDelete(id:number) {

        if (confirm("确定删除")) {
            this._appService.delGroup(id).subscribe(response=> {
                // this.groups. TODO: remove this id from groups
                alert(response)
            })
        }
    }

}


@Component({
    selector: 'div',
    template: `<ng-left></ng-left><div id="page-wrapper" class="gray-bg">
        <div class="row border-bottom">
            <ng-nav-bar></ng-nav-bar>
        </div>
        <ng-nav-cat-bar ></ng-nav-cat-bar>
        <ng-body></ng-body>
        <div class="footer fixed">
            <div class="pull-right">
                Version <strong>0.3.1</strong> GPL.
            </div>
            <div>
                <strong>Copyright</strong> Jumpserver.org Team &copy; 2014-2015
            </div>
        </div>
    </div>`,
    directives: [LeftbarComponent, NavComponent, NavcatbarComponent, Grouplist]
})
export class GrouplistComponent {

}