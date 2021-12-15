import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'footer',
  template: `
    <nz-layout>
      <nz-footer>
        Copyright
        <i nz-icon nzType="copyright"></i> 2021 <a href="" target="_blank"></a>
      </nz-footer>
    </nz-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {}
