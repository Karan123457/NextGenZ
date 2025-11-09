//Home.js
// Usage: import PolytechnicPortal from './PolytechnicPortal';
// Make sure collegesData.js is in same folder or adjust import path.

import React, { useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container, Row, Col, Form, Button, Card, Badge, Modal, Table, InputGroup, FormControl,
} from 'react-bootstrap';
import COLLEGES from './collegesData'; // <- adjust path if needed

const rupee = n => '₹' + Intl.NumberFormat('en-IN').format(Math.round(n || 0));
const pct = n => `${n ?? 0}%`;
const sum = arr => arr.reduce((a, b) => a + (b || 0), 0);

export default function Home() {
  // UI state
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [feesMax, setFeesMax] = useState(150000);
  const [placeMin, setPlaceMin] = useState(0);
  const [sortBy, setSortBy] = useState('rank');
  const [onlyTop, setOnlyTop] = useState(false);

  // App data state
  const [colleges] = useState(COLLEGES);
  const [compareSet, setCompareSet] = useState(new Set());

  // Modals
  const [detailsCollege, setDetailsCollege] = useState(null);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Derived lists for dropdowns
  const states = useMemo(() => [...new Set(colleges.map(c => c.state))].sort(), [colleges]);
  const courses = useMemo(() => [...new Set(colleges.flatMap(c => c.courses.map(x => x.name)))].sort(), [colleges]);

  

  // Filtering & sorting
  const filtered = useMemo(() => {
    let f = colleges.filter(c => {
      const text = (c.name + ' ' + c.city + ' ' + c.state + ' ' + c.type + ' ' + c.courses.map(x => x.name).join(' ')).toLowerCase();
      if (query && !text.includes(query.toLowerCase())) return false;
      if (typeFilter && c.type !== typeFilter) return false;
      if (stateFilter && c.state !== stateFilter) return false;
      if (courseFilter && !c.courses.some(x => x.name === courseFilter)) return false;
      if ((c.fees || 0) > feesMax) return false;
      if ((c.placementRate || 0) < placeMin) return false;
      if (onlyTop && (c.placementRate || 0) < 70) return false;
      return true;
    });

    

    if (sortBy === 'rank') f = f.slice().sort((a, b) => (b.placementRate || 0) - (a.placementRate || 0));
    else if (sortBy === 'feesAsc') f = f.slice().sort((a, b) => (a.fees || 0) - (b.fees || 0));
    else if (sortBy === 'feesDesc') f = f.slice().sort((a, b) => (b.fees || 0) - (a.fees || 0));
    else if (sortBy === 'cutoff') {
      const topCSE = c => {
        const cse = c.courses.find(x => /^(cse|cs|computer)/i.test(x.name));
        return cse ? (cse.cutoffRank || 999999) : 999999;
      };
      f = f.slice().sort((a, b) => topCSE(a) - topCSE(b));
    } else if (sortBy === 'name') f = f.slice().sort((a, b) => a.name.localeCompare(b.name));
    return f;
  }, [colleges, query, typeFilter, stateFilter, courseFilter, feesMax, placeMin, onlyTop, sortBy]);

  // Utilities
  function toggleCompare(id) {
    setCompareSet(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function openDetails(id) {
    const found = colleges.find(c => c.id === id);
    setDetailsCollege(found || null);
  }

  function closeDetails() {
    setDetailsCollege(null);
  }

  function openCompareModal() {
    if (compareSet.size === 0) {
      alert('Select colleges using the compare button on cards.');
      return;
    }
    setShowCompareModal(true);
  }

  // Small helpers for display
  const topCSECutoff = (c) => {
    const cse = c.courses.find(x => /^(cse|cs|computer)/i.test(x.name));
    return cse ? (cse.cutoffRank || 999999) : 999999;
  };

  
  // render
  return (
   <Container fluid style={{ marginTop: '70px' }}>
   
      <Container>
        {/* HERO / FILTERS */}
        
    <Row className="g-2 justify-content-center">
  <Col xs={12} lg={12} className="px-2 px-lg-3">
    <Card
      className="border-0 shadow-lg p-3 p-lg-4 text-center"
      style={{
        borderRadius: "16px",
        background: "linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card.Body>
        <h2 className="mb-3 fw-bold text-white">
          Find your best <span className="text-warning">Engineering & Polytechnic</span> college in India
        </h2>
        <p className="text-light mb-4">
          Filter by fees, placements, cutoffs, and more.
        </p>

        <InputGroup className="mb-4 justify-content-center">
          <FormControl
            placeholder="Search by college, city or state… (e.g., Delhi, CSE)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ maxWidth: 220 }}
          >
            <option value="rank">Top by Placement</option>
            <option value="feesAsc">Fees: Low → High</option>
            <option value="feesDesc">Fees: High → Low</option>
            <option value="cutoff">Cutoff (CSE): Toughest</option>
            <option value="name">Name A → Z</option>
          </Form.Select>
          <Button
            variant="outline-light"
            onClick={() => {
              setQuery("");
              setTypeFilter("");
              setStateFilter("");
              setCourseFilter("");
              setFeesMax(150000);
              setPlaceMin(0);
              setOnlyTop(false);
              setSortBy("rank");
            }}
          >
            Reset
          </Button>
        </InputGroup>

        {/* Filters row remains same */}
        <Row className="g-2 justify-content-center">
          <Col md={3}>
            <Form.Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">Any Type</option>
              <option>Government</option>
              <option>Private</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <option value="">All States</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
            >
              <option value="">Any Course</option>
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3} className="d-flex align-items-center justify-content-center">
            <Form.Check
              type="switch"
              id="topSwitch"
              label="Top Colleges Only (≥ 70%)"
              checked={onlyTop}
              onChange={(e) => setOnlyTop(e.target.checked)}
            />
          </Col>
        </Row>

        {/* Range sliders */}
        <Row className="g-3 mt-4 justify-content-center">
          <Col md={6}>
            <Form.Label className="text-white">
              Max Fees / year: <strong>{rupee(feesMax)}</strong>
            </Form.Label>
            <Form.Range
              min={0}
              max={150000}
              step={5000}
              value={feesMax}
              onChange={(e) => setFeesMax(Number(e.target.value))}
            />
          </Col>
          <Col md={6}>
            <Form.Label className="text-white">
              Min Placement %: <strong>{pct(placeMin)}</strong>
            </Form.Label>
            <Form.Range
              min={0}
              max={100}
              step={5}
              value={placeMin}
              onChange={(e) => setPlaceMin(Number(e.target.value))}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
</Row>

        
            
        
        {/* RESULTS */}
        <Row className="mt-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5>Colleges <small className="text-muted">({filtered.length} results)</small></h5>
              <div>
                <Button variant="success" size="sm" onClick={() => openCompareModal()} className="me-2">Open Compare</Button>
                <Button variant="secondary" size="sm" onClick={() => setCompareSet(new Set())}>Clear Compare</Button>
              </div>
            </div>

            <Row xs={1} md={2} lg={3} className="g-3">
              {filtered.map(c => {
                const totalSeats = sum(c.courses.map(x => x.seats || 0));
                const toughest = c.courses.slice().sort((a,b)=> (a.cutoffRank||999999)-(b.cutoffRank||999999))[0];
                return (
                  <Col key={c.id}>
                    <Card>
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                          <div>
                            <Card.Title>{c.name}</Card.Title>
                            <div className="text-muted small mb-1">{totalSeats} seats</div>
                            <div className="mb-2">
                              <Badge bg="secondary" className="me-1">{c.type}</Badge>
                              <Badge bg="secondary">{c.city}, {c.state}</Badge>
                              {toughest && <Badge bg="info" className="ms-1">Toughest: {toughest.name} • Rank {toughest.cutoffRank?.toLocaleString('en-IN')}</Badge>}
                            </div>
                          </div>
                          <div>
                            <Button variant="outline-secondary" size="sm" onClick={() => toggleCompare(c.id)}>
                              {compareSet.has(c.id) ? '✓' : '⇄'}
                            </Button>
                          </div>
                        </div>

                        <Row className="text-center mt-3">
                          <Col><div><strong>{rupee(c.fees)}</strong></div><small className="text-muted">Fees / yr</small></Col>
                          <Col><div><strong>{pct(c.placementRate)}</strong></div><small className="text-muted">Placement</small></Col>
                          <Col><div><strong>{(c.avgPackageLPA||0).toFixed(1)} LPA</strong></div><small className="text-muted">Avg Package</small></Col>
                        </Row>

                        <div className="d-flex gap-2 mt-3">
                          <Button variant="primary" size="sm" onClick={() => openDetails(c.id)}>Details</Button>
                          <Button variant="outline-secondary" size="sm" href={c.howToReach?.map || '#'} target="_blank">Map</Button>
                          {c.website && c.website !== '#' && <Button variant="outline-secondary" size="sm" href={c.website} target="_blank">Website</Button>}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>

        <footer className="mt-4 text-center text-muted">
          © {new Date().getFullYear()} Polytechnic Portal — Demo
        </footer>
      </Container>

      {/* DETAILS MODAL */}
      <Modal
        show={!!detailsCollege}
        onHide={closeDetails}
        size="lg"
        fullscreen="sm-down" // full screen on small devices
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{detailsCollege?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailsCollege && (
            <Row>
              <Col md={7}>
                <div className="mb-2">
                  <Badge pill bg="secondary" className="me-1">{detailsCollege.type}</Badge>
                  <Badge pill bg="secondary">{detailsCollege.city}, {detailsCollege.state}</Badge>
                </div>

                <Table responsive bordered>
                  <thead><tr><th>Course</th><th>Seats</th><th>Exam</th><th>Last Year Cutoff</th></tr></thead>
                  <tbody>
                    {detailsCollege.courses.map((x, i) => (
                      <tr key={i}>
                        <td>{x.name}</td>
                        <td>{x.seats ?? '-'}</td>
                        <td>{x.exam ?? '-'}</td>
                        <td>{x.cutoffRank ? x.cutoffRank.toLocaleString('en-IN') : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="d-flex gap-2 mt-2">
                  <div className="p-2 border rounded">
                    <small className="text-muted">Fees / year</small><div><strong>{rupee(detailsCollege.fees)}</strong></div>
                  </div>
                  <div className="p-2 border rounded">
                    <small className="text-muted">Placement</small><div><strong>{pct(detailsCollege.placementRate)}</strong></div>
                  </div>
                  <div className="p-2 border rounded">
                    <small className="text-muted">Avg Package</small><div><strong>{(detailsCollege.avgPackageLPA||0).toFixed(1)} LPA</strong></div>
                  </div>
                </div>
              </Col>

              <Col md={5}>
                <Card>
                  <Card.Body>
                    <Card.Title>How to reach</Card.Title>
                    <ul>
                      {detailsCollege.howToReach?.nearestMetro && <li><b>Metro:</b> {detailsCollege.howToReach.nearestMetro}</li>}
                      {detailsCollege.howToReach?.nearestRail && <li><b>Rail:</b> {detailsCollege.howToReach.nearestRail}</li>}
                      {detailsCollege.howToReach?.nearestAirport && <li><b>Airport:</b> {detailsCollege.howToReach.nearestAirport}</li>}
                    </ul>
                    <div className="d-grid gap-2">
                      <Button variant="primary" href={detailsCollege.howToReach?.map || '#'} target="_blank">Open Map</Button>
                      <Button variant="outline-secondary" onClick={() => toggleCompare(detailsCollege.id)}>
                        {compareSet.has(detailsCollege.id) ? 'Remove from Compare' : 'Add to Compare'}
                      </Button>
                      {detailsCollege.website && detailsCollege.website !== '#' && (
                        <Button variant="outline-secondary" href={detailsCollege.website} target="_blank">Visit Website</Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDetails}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* COMPARE MODAL */}
      <Modal
        show={showCompareModal}
        onHide={() => setShowCompareModal(false)}
        size="lg"
        fullscreen="sm-down"
        dialogClassName="modal-compare-lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Compare Colleges</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflowX: 'auto' }}>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Fees/yr</th>
                  <th>Placement %</th>
                  <th>Avg LPA</th>
                  <th>CSE Cutoff</th>
                </tr>
              </thead>
              <tbody>
                {[...compareSet].map(id => {
                  const c = colleges.find(x => x.id === id);
                  if (!c) return null;
                  return (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td>{c.type}</td>
                      <td>{c.city}, {c.state}</td>
                      <td>{rupee(c.fees)}</td>
                      <td>{pct(c.placementRate)}</td>
                      <td>{(c.avgPackageLPA || 0).toFixed(1)}</td>
                      <td>{topCSECutoff(c) === 999999 ? '-' : topCSECutoff(c).toLocaleString('en-IN')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
       
      </Modal>
    </Container>
  );
}



