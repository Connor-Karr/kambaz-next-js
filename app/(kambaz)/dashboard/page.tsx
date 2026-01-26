import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3021" className="wd-dashboard-course-link">
            <Image src="/images/python.jpg" width={200} height={150} alt="python" />
            <div>
              <h5> CS3021 Python Programming </h5>
              <p className="wd-dashboard-course-title">
                Introduction to Data Science
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/2156" className="wd-dashboard-course-link">
            <Image src="/images/algorithms.jpg" width={200} height={150} alt="algorithms" />
            <div>
              <h5> CS2156 Algorithms </h5>
              <p className="wd-dashboard-course-title">
                Data Structures and Algorithm Design
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/4782" className="wd-dashboard-course-link">
            <Image src="/images/database.jpg" width={200} height={150} alt="database" />
            <div>
              <h5> CS4782 Database Systems </h5>
              <p className="wd-dashboard-course-title">
                SQL and NoSQL Fundamentals
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1893" className="wd-dashboard-course-link">
            <Image src="/images/ml.jpg" width={200} height={150} alt="machine learning" />
            <div>
              <h5> CS1893 Machine Learning </h5>
              <p className="wd-dashboard-course-title">
                AI and Neural Networks
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3456" className="wd-dashboard-course-link">
            <Image src="/images/cybersecurity.jpg" width={200} height={150} alt="cybersecurity" />
            <div>
              <h5> CS3456 Cybersecurity </h5>
              <p className="wd-dashboard-course-title">
                Network Security and Cryptography
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/2670" className="wd-dashboard-course-link">
            <Image src="/images/mobile.jpg" width={200} height={150} alt="mobile dev" />
            <div>
              <h5> CS2670 Mobile Development </h5>
              <p className="wd-dashboard-course-title">
                iOS and Android App Development
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/4321" className="wd-dashboard-course-link">
            <Image src="/images/cloud.jpg" width={200} height={150} alt="cloud computing" />
            <div>
              <h5> CS4321 Cloud Computing </h5>
              <p className="wd-dashboard-course-title">
                AWS and Azure Architecture
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1547" className="wd-dashboard-course-link">
            <Image src="/images/gamedev.jpg" width={200} height={150} alt="game development" />
            <div>
              <h5> CS1547 Game Development </h5>
              <p className="wd-dashboard-course-title">
                Unity and Unreal Engine
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3912" className="wd-dashboard-course-link">
            <Image src="/images/blockchain.jpg" width={200} height={150} alt="blockchain" />
            <div>
              <h5> CS3912 Blockchain </h5>
              <p className="wd-dashboard-course-title">
                Cryptocurrency and Smart Contracts
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/2204" className="wd-dashboard-course-link">
            <Image src="/images/devops.jpg" width={200} height={150} alt="devops" />
            <div>
              <h5> CS2204 DevOps </h5>
              <p className="wd-dashboard-course-title">
                CI/CD and Container Orchestration
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/4589" className="wd-dashboard-course-link">
            <Image src="/images/quantum.jpg" width={200} height={150} alt="quantum computing" />
            <div>
              <h5> CS4589 Quantum Computing </h5>
              <p className="wd-dashboard-course-title">
                Quantum Algorithms and Applications
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}