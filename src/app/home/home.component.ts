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

  about = [
    "Hi! I'm Elijah Tamarchenko, a software engineer based in Boston.",
    "My main research interests lie in the intersection of Causal Inference and Machine Learning, where I want to develop methods for estimating causal effects in complex, high-dimensional settings. ",
    "I graduated from Williams College in 2023 with a B.A. in Computer Science and Statistics. ",
  ]

  links = [
    { link: 'https://github.com/etchenko', icon: faGithub },
    { link: 'https://www.linkedin.com/in/etchenko/', icon: faLinkedin},
    { link: "mailto:elijahtamarchenko@gmail.com", icon: faEnvelope},
    { link: "/assets/resume.pdf", icon: faFileAlt},
  ];

  news = [
    {
      date: "July 2023", 
      content: "Started a full-time position as a Software Engineer on the Applications Services team at InterSystems"
    },
    {
      date: "June 2023", 
      content: "Graduated from Williams College with a B.A. in Computer Science and Statistics",
    },
    {
      date: "May 2023", 
      content: "Finished my undergraduate thesis (Advisor: Prof. Rohit Bhattacharya)",
      link: "/assets/Elijah_Tamarchenko_Thesis.pdf",
      linkText: "Combining Optimal Adjustment Set Selection and Post Selection Inference in Unknown Causal Graphs."
    },
    {date: "Mar 2023", content: "Presented a colloquium talk at Williams College about LDA Topic Modelling"},
    {date: "Aug 2022", content: "Presented a poster about distributional causal inference at the Williams College Summer Science Poster Session."},
    {date: "Nov 2022", content: "I was an invited speaker for the Williams Undergraduate Research Journal (WURJ) 2022-23 Research Colloquium."},
  ];


}
