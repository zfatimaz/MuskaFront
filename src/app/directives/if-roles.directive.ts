import { Input, OnInit,Directive,ViewContainerRef, TemplateRef, OnDestroy, ElementRef } from '@angular/core';
import { Subject, Subscription } from "rxjs";
import { RolesService } from '../service/roles.service';
import { AuthService } from '../service/AuthService';

@Directive({
  selector: '[hasPermission]'
})
export class IfRolesDirective implements OnInit{
  private currentUser: any;
  private roles = [];
  private isHidden = true;

  //private subscription: Subscription[] = [];
  @Input() public ifRoles: Array<string>;
  /**
   * @param {ViewContainerRef} viewContainerRef 
   * 	-- the location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef 
   *   -- the templateRef to be potentially rendered
   * @param {RolesService} rolesService 
   *   -- will give us access to the roles a user has
   */

  constructor(private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: AuthService) { }
    

    ngOnInit() {
      
  
    }
    @Input()
  set hasPermission(val) {
    //this.myString.split(',')
    this.roles = val;
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.updateView();
    });
  }
  /*private updateView() {
    if (this.checkPermission()) {
        this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }*/
  private updateView() {
    
    if (this.checkPermission()) {
      if(this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }
  private checkPermission() {
    let hasPermission = false;
    if (this.currentUser) {
      debugger
      console.log(this.currentUser.roles);
      for (const checkPermission of this.roles) {
        const permissionFound = this.currentUser.roles.split(',').find(x => x.toUpperCase() === checkPermission.toUpperCase());
        if(permissionFound){
          hasPermission = true;
        }else{
          hasPermission = false;
        }
      }
    }
  
    return hasPermission;
    
  }

    /*public ngOnInit() { 
      this.subscription.push(
        this.rolesService.roles().subscribe(res => { 
          if (!res.roles) {
            this.viewContainerRef.clear();
          }
          const idx = res.roles.findIndex((element) => this.ifRoles.indexOf(element) !== -1);
          if (idx < 0) {
            this.viewContainerRef.clear();
          } else { 
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        })
      );
    }*/
  
    //public ngOnDestroy(): void {
      //this.subscription.forEach((subscription: Subscription) => subscription.unsubscribe());
    //}
}
