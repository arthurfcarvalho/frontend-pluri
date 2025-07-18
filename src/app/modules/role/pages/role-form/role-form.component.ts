import { Component, OnInit } from '@angular/core';
import { PermService } from '../../../../services/perm.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from '../../../../services/area.service';
import { RoleService } from '../../../../services/role.service';
import { FieldConfig } from '../../../../shared/components/simple-entity-form/field-config-model';
import { SimpleEntityFormComponent } from '../../../../shared/components/simple-entity-form/simple-entity-form.component';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [
    SimpleEntityFormComponent 
  ],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss'
})
export class RoleFormComponent implements OnInit {

  form!: FormGroup;
  fields: FieldConfig[] = [];
  loading = false;
  isEditMode = false;
  roleId: number | null = null;
  areaList: any[] = [];
  permissionList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private areaService: AreaService,
    private permService: PermService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.roleId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.roleId;

    this.form = this.fb.group({
      nome: ['', Validators.required],
      id_area: [null, Validators.required],
      codigo_permissoes: [[]]
    });

    this.loadDependencies();

    if (this.isEditMode) {
      this.loading = true;
      this.roleService.getById(this.roleId!).subscribe(role => {
        this.form.patchValue({
          nome: role.nome,
          id_area: role.area,
          codigo_permissoes: role.permissoes.map(p => p.codigo)
        });
        this.loading = false;
      });
    }
  }

  loadDependencies(): void {
    this.areaService.returnAllAreas().subscribe((areaData: any) => {
      this.areaList = areaData.content || [];
      this.permService.returnAll().subscribe((perms: any) => {
        this.permissionList = perms;

        this.fields = [
          { name: 'nome', labelKey: 'role.nameLabel', type: 'text', formControlName: 'nome' },
          {
            name: 'id_area',
            labelKey: 'role.areaLabel',
            type: 'dropdown',
            formControlName: 'id_area',
            options: this.areaList,
            optionLabel: 'nome'
          },
          {
            name: 'codigo_permissoes',
            labelKey: 'role.permissionsLabel',
            type: 'picklist',
            formControlName: 'codigo_permissoes',
            options: this.permissionList,
            filterBy: 'nome',
            optionValue: 'codigo',
            displayTemplate: (item: any) => item.nome
          }
        ];
      });
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const formData = this.form.value;

    if (this.isEditMode) {
      const updatePayload = {
        id: this.roleId!,
        nome: formData.nome,
        area: formData.id_area
      };

      this.roleService.update(updatePayload).subscribe({
        next: () => {
          this.roleService.saveRoles(this.roleId!, formData.codigo_permissoes).subscribe({
            next: () => {
              this.toastr.success(this.translate.instant('role.successEdit'));
              this.router.navigate(['/pesquisar-perfis']);
            },
            error: () => {
              this.toastr.error(this.translate.instant('role.error'));
              this.loading = false;
            }
          });
        },
        error: () => {
          this.toastr.error(this.translate.instant('role.error'));
          this.loading = false;
        }
      });

    } else {
      const payload = {
        nome: formData.nome,
        id_area: formData.id_area.id,
        codigo_permissoes: formData.codigo_permissoes
      };

      this.roleService.create(payload).subscribe({
        next: () => {
          this.toastr.success(this.translate.instant('role.successCreate'));
          this.router.navigate(['/pesquisar-perfis']);
        },
        error: () => {
          this.toastr.error(this.translate.instant('role.error'));
          this.loading = false;
        }
      });
    }
  }

}
