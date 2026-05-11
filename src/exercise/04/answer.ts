// Exercise 04 Answer: OmniContent strategic design

/*
Modules (exactly 8) with classification and justification

1) Content Ingestion - Deep Module
   Responsibility: Normalize and validate incoming content from any source.
   Justification: Small interface (ingest/subscribe) hides complex parsing,
   validation, enrichment, and error handling pipelines.

2) Access Control - Deep Module
   Responsibility: Enforce permissions across front-ends and partner APIs.
   Justification: Simple canAccess interface hides complex policy evaluation
   (RBAC, ABAC, subscription tiers).

3) Metadata Management - Deep Module
   Responsibility: Store, index, and evolve content metadata.
   Justification: Simple CRUD/query interface hides schema evolution, migration,
   and storage optimizations.

4) Analytics - Deep Module
   Responsibility: Collect events, aggregate metrics, and produce reports.
   Justification: Simple track/report interface hides aggregation, batching,
   and anomaly handling.

5) Notification System - Deep Module
   Responsibility: Route notifications across channels with templates and rules.
   Justification: Simple send interface hides routing, throttling, and delivery
   guarantees.

6) Search - Shallow Module
   Responsibility: Provide search API over content.
   Justification: Interface closely matches functionality; delegates heavy work
   to ingestion updates and index engine.

7) Content Delivery - Shallow Module
   Responsibility: Deliver content to clients and partners.
   Justification: Facade interface maps directly to delivery endpoints and
   caching policies.

8) User Management - Shallow Module
   Responsibility: Account, auth, and profile management.
   Justification: Straightforward operations with limited hidden complexity.

Pattern requirements
 - Bridge: Access Control (abstraction) decoupled from implementations (RBAC/ABAC).
 - Factory: Content Ingestion creates processors for Article/Video/Audio.
 - Observer: Search subscribes to Content Ingestion to keep indexes fresh.
 - Repository: Metadata Management hides persistence details to avoid viscosity.

Strategic conclusion
This design combats rigidity by isolating change in deep modules and stable
interfaces, fragility by decoupling modules through patterns, immobility by
keeping policies and storage behind abstractions, and viscosity by minimizing
cross-module edits for schema or policy changes. The result is a long-term
platform that adapts to new content types and business models with low risk.
*/

// Shared domain types
export type ContentType = "article" | "video" | "podcast";

export interface ContentInput {
  type: ContentType;
  rawPayload: string;
  source: "cms" | "partner" | "upload";
}

export interface ContentRecord {
  id: string;
  type: ContentType;
  normalizedPayload: string;
  metadata: Record<string, string>;
}

// 1) Content Ingestion (Deep) + Factory Pattern + Observer Pattern
export interface ContentProcessor {
  process(input: ContentInput): ContentRecord;
}

export interface ArticleProcessor extends ContentProcessor {}
export interface VideoProcessor extends ContentProcessor {}
export interface AudioProcessor extends ContentProcessor {}

export interface ContentProcessorFactory {
  createProcessor(type: ContentType): ContentProcessor;
}

export interface ContentIngestionObserver {
  onContentIngested(record: ContentRecord): void;
}

export interface ContentIngestionModule {
  ingest(input: ContentInput): ContentRecord;
  subscribe(observer: ContentIngestionObserver): () => void;
}

// 2) Access Control (Deep) + Bridge Pattern
export interface AccessSubject {
  id: string;
  roles: string[];
  attributes: Record<string, string>;
}

export interface AccessResource {
  id: string;
  type: "content" | "metadata" | "analytics";
  attributes: Record<string, string>;
}

export type AccessAction = "read" | "write" | "delete" | "publish";

// Implementor side of the Bridge
export interface AccessControlImplementor {
  canAccess(subject: AccessSubject, action: AccessAction, resource: AccessResource): boolean;
}

// Abstraction side of the Bridge
export interface AccessControlModule {
  canAccess(subject: AccessSubject, action: AccessAction, resource: AccessResource): boolean;
  setImplementation(impl: AccessControlImplementor): void;
}

export interface RoleBasedAccessControl extends AccessControlImplementor {}
export interface AttributeBasedAccessControl extends AccessControlImplementor {}

// 3) Metadata Management (Deep) + Repository Pattern
export interface MetadataRecord {
  contentId: string;
  tags: string[];
  attributes: Record<string, string>;
}

export interface MetadataQuery {
  tag?: string;
  attributeKey?: string;
  attributeValue?: string;
}

export interface ContentMetadataRepository {
  findById(contentId: string): MetadataRecord | null;
  save(record: MetadataRecord): void;
  query(filter: MetadataQuery): MetadataRecord[];
}

export interface MetadataManagementModule {
  get(contentId: string): MetadataRecord | null;
  upsert(record: MetadataRecord): void;
  search(filter: MetadataQuery): MetadataRecord[];
}

// 4) Analytics (Deep)
export interface AnalyticsEvent {
  name: string;
  contentId?: string;
  attributes: Record<string, string>;
}

export interface AnalyticsQuery {
  name: string;
  from: string;
  to: string;
}

export interface AnalyticsReport {
  name: string;
  total: number;
}

export interface AnalyticsModule {
  track(event: AnalyticsEvent): void;
  report(query: AnalyticsQuery): AnalyticsReport;
}

// 5) Notification System (Deep)
export interface NotificationRequest {
  userId: string;
  channel: "email" | "sms" | "push";
  templateId: string;
  variables: Record<string, string>;
}

export interface NotificationResult {
  requestId: string;
  accepted: boolean;
}

export interface NotificationModule {
  send(request: NotificationRequest): NotificationResult;
}

// 6) Search (Shallow) + Observer subscription
export interface SearchQuery {
  text: string;
  type?: ContentType;
}

export interface SearchResult {
  contentId: string;
  score: number;
}

export interface SearchModule extends ContentIngestionObserver {
  query(request: SearchQuery): SearchResult[];
}

// 7) Content Delivery (Shallow)
export interface DeliveryRequest {
  contentId: string;
  channel: "web" | "mobile" | "partner";
}

export interface DeliveryResponse {
  contentId: string;
  payload: string;
}

export interface ContentDeliveryModule {
  deliver(request: DeliveryRequest): DeliveryResponse;
}

// 8) User Management (Shallow)
export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
}

export interface UserManagementModule {
  register(email: string, password: string): UserProfile;
  authenticate(email: string, password: string): string;
  updateProfile(profile: UserProfile): UserProfile;
}