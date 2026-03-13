import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

type ResearchItem = {
  type: 'Paper' | 'Talk' | 'Poster';
  title: string;
  venue: string;
  date: string;
  summary: string;
  links?: { label: string; href: string }[];
};

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss'
})
export class ResearchComponent {
  researchItems: ResearchItem[] = [
    {
      type: 'Paper',
      title: 'Combining optimal adjustment set selection and post-selection inference in unknown causal graphs',
      venue: 'Williams College Undergraduate Thesis',
      date: 'May 2023',
      summary:
        'Introduced a framework that unifies covariate adjustment set selection with treatment effect inference, designed for realistic finite-sample settings.',
      links: [
        {
          label: 'Read thesis PDF',
          href: '/assets/Elijah_Tamarchenko_Thesis.pdf'
        }
      ]
    },
    {
      type: 'Talk',
      title: 'Interpreting LDA topic modeling in practice',
      venue: 'Williams College Colloquium',
      date: 'Mar 2023',
      summary:
        'Presented modeling assumptions, validation strategies, and practical caveats when using LDA to analyze noisy real-world corpora.'
    },
    {
      type: 'Poster',
      title: 'Distributional causal inference under observational uncertainty',
      venue: 'Williams College Summer Science Poster Session',
      date: 'Aug 2022',
      summary:
        'Explored treatment effects across full outcome distributions rather than only average treatment effects.'
    }
  ];
}
