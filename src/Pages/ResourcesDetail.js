import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Sem1 from '../data_Resources/JharDiploma/Sem1';
import Sem2 from '../data_Resources/JharDiploma/Sem2';
import Sem3 from '../data_Resources/JharDiploma/Sem3';
import Sem4 from '../data_Resources/JharDiploma/Sem4';
import Sem5 from '../data_Resources/JharDiploma/Sem5';
import Sem6 from '../data_Resources/JharDiploma/Sem6';
import JHPolytechnic from '../data_Resources/JharPolytechnic/JHPolytechnic';
import JHQPaper from '../data_Resources/JharPolytechnic/JHQPaper';
import D2DInfo from '../data_Resources/JharD2D/D2DInfo';
import JHD2DQPaper from '../data_Resources/JharD2D/JHD2DQPaper';

const ResourcesDetail = () => {
  const { state } = useLocation();
  const { mainKey, subId } = useParams();
  const navigate = useNavigate();

  const type = state?.type;
  const title = state?.title || `${mainKey} - ${subId}`;

  const goBack = () => navigate('/resources');

  if (!type) {
    return (
      <div style={{ padding: 30 }}>
        <h2 style={{ color: '#0d6efd' }}>{title}</h2>
        <p>Resource type not provided. Please open this page via the Resources list.</p>
        <div style={{ marginTop: 18 }}>
          <button className="btn btn-primary" onClick={goBack}>Back to Resources</button>
        </div>
      </div>
    );
  }

  switch (type) {
    case 'fullContent':
      return <Sem1 />;
    case 'fullContent2':
      return <Sem2 />;
    case 'fullContent3':
      return <Sem3 />;
    case 'fullContent4':
      return <Sem4 />;
    case 'fullContent5':
      return <Sem5 />;
    case 'fullContent6':
      return <Sem6 />;
    case 'fullJHPoly':
      return <JHPolytechnic />;
    case 'fullJHPoly2':
      return <JHQPaper />;
    case 'D2dExam':
      return <D2DInfo />;
    case 'D2dExam2':
      return <JHD2DQPaper />;
    default:
      return (
        <div style={{ padding: 30 }}>
          <h2 style={{ color: '#0d6efd' }}>{title}</h2>
          <p>Unknown resource type: {type}</p>
          <div style={{ marginTop: 18 }}>
            <button className="btn btn-primary" onClick={goBack}>Back to Resources</button>
          </div>
        </div>
      );
  }
};

export default ResourcesDetail;
