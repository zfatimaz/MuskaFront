import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, Subscription } from "rxjs";
import { RolesService } from '../service/roles.service';


@Directive({
  selector: '[IfRole]'
})
export class IfRoleDirective implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  @Input() public ifRoles: Array<string>;

  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private userService: RolesService) { }

    public ngOnInit(): void {
      this.subscription.push(
        this.userService.roles().subscribe(res => {
          if (!res.roles) {
            // Remove element from DOM
            this.viewContainerRef.clear();
          }
          // user Role are checked by a Roles mention in DOM
          const idx = res.roles.findIndex((element) => this.ifRoles.indexOf(element) !== -1);
          if (idx < 0) {
            this.viewContainerRef.clear();
          } else {
            // appends the ref element to DOM
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        })
      );
    }
    public ngOnDestroy(): void {
      this.subscription.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

}
