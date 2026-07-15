import { Component } from '@angular/core';
import { Tools } from 'src/app/models/tools';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  activePreview: string | null = null;
  nest4usProject: Tools[] = [
    {
      name: 'Angular',
    },
    {
      name: 'Node.js',
    },
    {
      name: 'Express',
    },
    {
      name: 'MongoDB',
    }
  ];

  secoundProject: Tools[] = [
    {
      name: 'Angular',
    },
    {
      name: 'Node.js',
    },
    {
      name: 'Mssql',
    },
    {
      name: 'GIT',
    }
  ];

  thirdProject: Tools[] = [
    {
      name: 'HTML',
    },
    {
      name: 'SCSS',
    },
    {
      name: 'TypeScript',
    },
    {
      name: 'Angular',
    },
    {
      name: 'Aungular Material',
    },
  ];

  nestFourUs = () => {
    window.open(environment.nest4us, '_blank');
  };

  projectTwo = () => {
    window.open(environment.projectTwo, '_blank');
  };

  projectThree = () => {
    window.open(environment.projectThree, '_blank');
  };
}
