import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { CommonModule, NgFor } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, CommonModule, NgFor, IconModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly currentYear = new Date().getFullYear();

  heroTitle = "Master's Student in Statistics";
  heroSubtitle = 'Focused on causal inference, uncertainty quantification, and trustworthy machine learning.';

  about = [
    "Hi! I'm Elijah Tamarchenko, an MSc student in Statistics at ETH Zurich.",
    "I am interested in causal inference, uncertainty quantification, and trustworthy machine learning.",
    "My undergraduate thesis developed a procedure that performs covariate selection and treatment effect estimation in a single step.",
    "I graduated from Williams College in 2023 with a B.A. in Computer Science and Statistics and a minor in Cognitive Science.",
    "I also worked for 2 years as a software engineer at Intersystems"
  ];

  timeline = [
    {
      date: '2025–Present',
      startYear: 2025,
      endYear: this.currentYear,
      title: 'MSc in Statistics',
      badge: 'Education',
      subtitle: 'ETH Zurich',
      description: 'Graduate study focused on causal inference and uncertainty quantification.',
      current: true
    },
    {
      date: '2023–2025',
      startYear: 2023,
      endYear: 2025,
      title: 'Software Engineer',
      badge: 'Industry',
      subtitle: 'Intersystems',
      description: 'Built and shipped production features in a collaborative engineering environment.'
    },
    {
      date: '2023',
      startYear: 2023,
      endYear: 2023,
      title: 'Undergraduate Thesis',
      badge: 'Research',
      subtitle: 'Williams College',
      description: 'Developed a single-step method for covariate selection and causal effect inference under unknown graph structure.',
      link: '/assets/Elijah_Tamarchenko_Thesis.pdf',
      linkText: 'Thesis PDF'
    },
    {
      date: '2019–2023',
      startYear: 2019,
      endYear: 2023,
      title: 'BA Statistics and Computer Science',
      badge: 'Education',
      subtitle: 'Williams College',
      description: 'Graduated with Highest Honors.'
    }
  ];

  projects = [
    {
      title: '2022 Research Abstract Classification',
      description: 'Compared the performance of LSTM and transformer models for classifying research papers from abstracts, achieving 92% accuracy through fine-tuning.'
    },
    {
      title: '2022 Evolution Simulator',
      description: 'Built a program that simulates natural selection and evolution through the reproduction of simple dot organisms over many generations, enabling analysis of organism behavior.'
    },
    {
      title: '2021 Analysis of School Funding on Student Achievement',
      description: 'Conducted a causal machine learning analysis of school funding and student proficiency, finding that funding decreases can account for about 18,000 Massachusetts students being deemed not academically proficient.'
    },
    {
      title: '2020–2021 Williams Students Online',
      description: 'Implemented a professor review feature on the student website used by more than 2,000 students.'
    }
  ];

  links = [
    { link: 'https://github.com/etchenko', icon: faGithub, label: 'GitHub profile' },
    { link: 'https://www.linkedin.com/in/etchenko/', icon: faLinkedin, label: 'LinkedIn profile' },
    { link: 'mailto:etchenko@pm.me', icon: faEnvelope, label: 'Email Elijah' },
    { link: '/assets/ElijahTamarchenkoCV.pdf', icon: faFileAlt, label: 'Curriculum vitae PDF' }
  ];

  getConnectorLeft(item: { startYear?: number; endYear?: number }): string {
    if (item.startYear === undefined || item.endYear === undefined) {
      return '50%';
    }

    const years = this.timeline
      .flatMap((entry) => [entry.startYear, entry.endYear])
      .filter((year): year is number => year !== undefined);

    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    if (maxYear === minYear) {
      return '50%';
    }

    const midpoint = (item.startYear + item.endYear) / 2;
    const ratio = (midpoint - minYear) / (maxYear - minYear);
    const clampedRatio = Math.min(0.88, Math.max(0.12, ratio));
    return `${clampedRatio * 100}%`;
  }

  get orderedTimeline() {
    return [...this.timeline].sort((first, second) => {
      const firstStart = first.startYear ?? 0;
      const secondStart = second.startYear ?? 0;

      if (firstStart !== secondStart) {
        return firstStart - secondStart;
      }

      const firstEnd = first.endYear ?? firstStart;
      const secondEnd = second.endYear ?? secondStart;
      return firstEnd - secondEnd;
    });
  }

  isTimelineItemAbove(index: number): boolean {
    const currentIndex = this.orderedTimeline.findIndex((item) => item.current);
    if (currentIndex === -1) {
      return index % 2 === 0;
    }

    return Math.abs(index - currentIndex) % 2 === 0;
  }
}
