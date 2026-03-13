import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

type Project = {
  title: string;
  problem: string;
  method: string;
  outcome: string;
  tags: string[];
  links: { label: string; href: string }[];
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Causal Inference Thesis Work',
      problem:
        'Adjustment set selection and treatment effect estimation are often treated as separate steps, which can understate downstream uncertainty.',
      method:
        'Designed a single-step workflow that links covariate selection and effect estimation under unknown causal graph assumptions.',
      outcome:
        'Produced an end-to-end thesis methodology centered on finite-sample reliability and practical post-selection inference.',
      tags: ['causal inference', 'post-selection inference', 'methodology'],
      links: [
        {
          label: 'Thesis PDF',
          href: '/assets/Elijah_Tamarchenko_Thesis.pdf'
        }
      ]
    },
    {
      title: 'LDA Topic Modeling Colloquium',
      problem:
        'Topic models are easy to over-interpret without explicit diagnostics and stability checks.',
      method:
        'Built an applied presentation workflow covering preprocessing, model selection, and qualitative topic validation.',
      outcome:
        'Delivered a colloquium framework for using LDA with clearer assumptions and stronger interpretation guardrails.',
      tags: ['NLP', 'topic modeling', 'interpretability'],
      links: []
    },
    {
      title: 'Distributional Causal Inference Poster',
      problem:
        'Average treatment effects can miss important heterogeneity across the full outcome distribution.',
      method:
        'Analyzed causal effects at the distribution level and compared behavior under observational uncertainty.',
      outcome:
        'Presented findings at a summer science poster session and highlighted where distributional effects change decisions.',
      tags: ['distributional effects', 'observational data', 'uncertainty'],
      links: []
    }
  ];

}
