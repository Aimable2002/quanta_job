import { motion } from 'framer-motion';
import styles from '../css/research.module.css'

const ResearchInnovation = () => {
  return (
    <section className={styles.researchInnovation} id="research-innovation">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Research & Innovation Program</h2>
          <p>Where rigorous research meets rapid product innovation.</p>
        </div>

        <div className={styles.content}>
          <motion.div 
            className={styles.programOverview}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>Program Overview</h3>
            <p>
              The QUANTA Research & Innovation Program is a builder's lab inside the company. 
              We combine formal research practices (clear hypotheses, reproducible experiments, peer review) 
              with startup execution (fast sprints, tangible prototypes, real users). Participants work on 
              applied problems in Artificial Intelligence, including LoRA-based fine-tuning, LLMs, multimodal 
              systems, AI evaluation, and scalable software that moves from lab to market.
            </p>
            <p>
              Operating cadence: one weekly online meeting, one monthly in-person demo, and immediate ad-hoc 
              meetings called by the CEO if blockers or quality risks appear—no questions, no delays.
            </p>
          </motion.div>

          <motion.div 
            className={styles.targetAudience}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>Who This Is For</h3>
            <ul>
              <li>Researchers and engineers with a track record in AI/ML, data, or systems.</li>
              <li>Product builders who can translate research into working software.</li>
              <li>Students and recent graduates with strong portfolios (code, papers, shipped projects).</li>
              <li>Practitioners from industry seeking to contribute to deep-tech, quickly.</li>
            </ul>
          </motion.div>

          <div className={styles.tracks}>
            <motion.div 
              className={styles.track}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3>Research Tracks</h3>
              <ul>
                <li>LLM Efficiency & LoRA: low-rank adaptation, domain adaptation, parameter-efficient training.</li>
                <li>Evaluation & Safety: robust eval suites, grounding, bias/harms assessment, red-team tooling.</li>
                <li>Multimodal Intelligence: text-audio-image pipelines, retrieval-augmented generation.</li>
                <li>Edge/On-Device AI: lightweight inference, quantization, latency/throughput trade-offs.</li>
                <li>Data & Tooling: synthetic data, dataset curation, labeling strategies, observability.</li>
              </ul>
            </motion.div>

            <motion.div 
              className={styles.track}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3>Innovation Tracks</h3>
              <ul>
                <li>Applied AI Prototypes: user-facing assistants, chatrooms, music upload intelligence, moderation.</li>
                <li>Platform & Infra: auth, billing, telemetry, CI for models and features.</li>
                <li>Growth Experiments: product loops, activation funnels, content systems that scale.</li>
              </ul>
            </motion.div>
          </div>

          <motion.div 
            className={styles.deliverables}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>What You'll Produce</h3>
            <div className={styles.deliverableTypes}>
              <div className={styles.deliverableType}>
                <h4>Research Artifacts</h4>
                <ul>
                  <li>Problem statement and literature scan (1–2 pages)</li>
                  <li>Reproducible experiments (code, configs, seeds)</li>
                  <li>Technical note or preprint with metrics and ablations</li>
                </ul>
              </div>
              <div className={styles.deliverableType}>
                <h4>Product Artifacts</h4>
                <ul>
                  <li>Running prototype (API or UI), with setup docs</li>
                  <li>Demo video (&lt;5 minutes) and acceptance criteria</li>
                  <li>Launch checklist: performance, safety, monitoring</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.mentorship}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>Mentorship & Resources</h3>
            <ul>
              <li><strong>Mentors:</strong> QUANTA founders, senior engineers, invited advisors</li>
              <li><strong>Reviews:</strong> weekly research and product reviews; code and experiment audits</li>
              <li><strong>Resources:</strong> model/API credits, GPU time (as available), design support, internal datasets (subject to policy)</li>
            </ul>
          </motion.div>

          <motion.div 
            className={styles.ipPolicy}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>IP, Publishing & Ethics</h3>
            <ul>
              <li><strong>IP:</strong> Work created in the program is owned by QUANTA. Contributors are credited.</li>
              <li><strong>Publishing:</strong> With approval, we may publish technical notes or open-source components that do not reveal sensitive assets.</li>
              <li><strong>Privacy & Safety:</strong> Strict confidentiality, data protection, and safe-use policies apply to all projects.</li>
            </ul>
          </motion.div>

          <motion.div 
            className={styles.howWeWork}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <h3>How We Work (discipline + speed)</h3>
            <ul>
              <li>Weekly online stand-up: goals, blockers, decisions</li>
              <li>Monthly in-person demo day: show results, ship, or cut</li>
              <li>Immediate escalation: if progress, quality, or integrity slips, the CEO will call an urgent meeting—no questions, no delays</li>
            </ul>
            <p>
              Values in practice: Empathy, Focus, Impute, Extreme Ownership, Future Obsession, 
              Sacrificial Dedication, 100x Mindset, Intelligent Unity, Uncompromised Integrity, 
              Built for Earth and Beyond.
            </p>
          </motion.div>

          <motion.div 
            className={styles.selectionCriteria}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <h3>Selection Criteria</h3>
            <ul>
              <li>Demonstrated skill (GitHub, papers, shipped apps, benchmarks)</li>
              <li>Clarity of problem definition and experimental plan</li>
              <li>Ability to ship usable software, not just prototypes</li>
              <li>Alignment with QUANTA's values and security standards</li>
            </ul>
          </motion.div>

          <motion.div 
            className={styles.commitment}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            viewport={{ once: true }}
          >
            <h3>Commitment & Timeline</h3>
            <ul>
              <li><strong>Sprint length:</strong> Typical cycles of 6–8 weeks</li>
              <li><strong>Time commitment:</strong> choose Research-heavy or Build-heavy track; we expect consistent weekly progress and on-time deliverables</li>
              <li><strong>Extensions:</strong> granted only when results warrant continued investment</li>
            </ul>
          </motion.div>

          <motion.div 
            className={styles.howToApply}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            viewport={{ once: true }}
          >
            <h3>How to Apply</h3>
            <ol>
              <li>Complete the Research & Innovation Application</li>
              <li>Choose your primary track (Research or Innovation) and focus area</li>
              <li>Share your CV and portfolio (repos, papers, demos)</li>
              <li>Propose a mini-plan (3–5 bullets: problem, approach, data, metrics)</li>
              <li>Accept program policies (IP, confidentiality, ethics)</li>
            </ol>
            <div className={styles.ctaButtons}>
              <a href="#" className={styles.primaryButton}>Apply to the Research & Innovation Program</a>
              <a href="#" className={styles.secondaryButton}>View Open Challenges</a>
              <a href="#" className={styles.secondaryButton}>Program Handbook (PDF)</a>
              <a href="#" className={styles.secondaryButton}>FAQs</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResearchInnovation;