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
  heroTitle = "Master's Student in Statistics";
  heroSubtitle = 'Focused on causal inference, uncertainty quantification, and trustworthy machine learning.';

  about = [
    "Hi! I'm Elijah Tamarchenko, a Master's student in Statistics and software engineer based in Boston.",
    "I work on uncertainty quantification and causal inference, especially when data is finite, noisy, or observational.",
    "My research focus is counterfactual estimation: how to build methods that are both accurate and honest about uncertainty.",
    "I am particularly interested in post-selection inference, causal graph structure, and practical ML systems for scientific decision-making.",
    "My undergraduate thesis developed a procedure that performs covariate selection and treatment effect estimation in a single step.",
    "I graduated from Williams College in 2023 with a B.A. in Computer Science and Statistics and a minor in Cognitive Science.",
  ];

  links = [
    { link: 'https://github.com/etchenko', icon: faGithub, label: 'GitHub profile' },
    { link: 'https://www.linkedin.com/in/etchenko/', icon: faLinkedin, label: 'LinkedIn profile'},
    { link: 'mailto:etchenko@pm.me', icon: faEnvelope, label: 'Email Elijah'},
    { link: '/assets/ElijahTamarchenkoCV.pdf', icon: faFileAlt, label: 'Curriculum vitae PDF'},
  ];

  news = [
    {
      date: "July 2023", 
      content: "Started a full-time position as a Software Engineer on the Application Services team at InterSystems"
    },
    {
      date: "June 2023", 
      content: "Graduated from Williams College with a B.A. in Computer Science and Statistics",
    },
    {
      date: "May 2023", 
      content: "Finished my undergraduate thesis (Advisor: Prof. Rohit Bhattacharya)",
      link: "/assets/Elijah_Tamarchenko_Thesis.pdf",
      linkText: "Combining optimal adjustment set selection and post-selection inference in unknown causal graphs"
    },
    {date: "Mar 2023", content: "Presented a colloquium talk at Williams College on LDA topic modeling"},
    {date: "Aug 2022", content: "Presented a poster about distributional causal inference at the Williams College Summer Science Poster Session."},
    {date: "Nov 2022", content: "I was an invited speaker for the Williams Undergraduate Research Journal (WURJ) 2022-23 Research Colloquium."},
  ];


}
