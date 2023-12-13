import React from 'react';
import './ProgramOverview.css';

function ProgramOverview() {
  return (
    <div className="program-overview">
      <section className="about-us">
        <h2>About Us</h2>
        <p><b>About HSyE</b></p>
        The Healthcare Systems Engineering (HSyE) institute has focused for over 30 years on improving healthcare quality, logistics, safety, efficiency, flow, and access. We have a simple ‘triple aim’ mission – to broadly impact healthcare improvement through workforce development, research, and application of systems engineering methods to important healthcare problems. We accomplish and balance this mission through diverse healthcare partnerships, undergraduate through post-doctoral programs, four sponsored healthcare industrial engineering centers, and external grants and contracts – to-date totaling over $174 million in funding, 200 publications, and 900 students trained.  Please browse our pages to see the breadth of our work and impact and please contact us to explore how to become involved.
      </section>
      
      <section className="why-healthcare">
        <h2>Why Health Care</h2>
        Health care is the largest industry in the world, outpacing the rate of inflation, and riddled with system problems in almost every setting that result in poor efficiency, effectiveness, safety, access, equity, and patient-centeredness. An 30% of total U.S. healthcare costs are attributable to poorly designed processes and estimated impacts of medical errors due to poor processes are staggering (~1.4 million injured patients, millions of hospital days, 100,000 deaths, $9 billion annually), prompting the National Academy of Sciences to advocate much greater application of systems engineering methods as used in other industries
      </section>

      <section className="systems-engineering">
        <h2>What is Systems Engineering</h2>
        Systems engineering (SE) is two things: (1) a general approach, framework, and way of thinking to address and solve problems and (2) a set methods to help understand, model, and design more efficient, reliable, and safe processes (and systems of systems), ranging from basic process improvement, human factors, mathematical/computer modeling, and advanced analytic methods used in many other industries to study, improve, and optimize process quality, delays, cost, efficiency, and effectiveness - national healthcare priorities also identified by the National Academy of Medicine
      </section>
    </div>
  );
}

export default ProgramOverview;
