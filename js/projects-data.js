/**
 * BAHGAT ZAKARIA — DATA ENGINEERING PORTFOLIO
 * Projects Data Registry (projects-data.js)
 * Centralized schema for scalable project management.
 */

const PROJECTS_DATA = [
  {
    id: "data-warehouse-etl",
    title: "End-to-End Data Warehouse & ETL Pipeline",
    category: "warehousing-etl",
    categoryLabel: "Data Warehousing & ETL",
    shortDescription: "A multi-layered data warehouse architecture implemented in SQL Server, transforming raw CRM and ERP data into an analytics-ready Star Schema using Medallion Architecture (Bronze → Silver → Gold).",
    technologies: ["SQL Server", "SQL", "ETL", "Data Warehousing", "Data Modeling", "Star Schema"],
    problem: "Operational data from CRM and ERP source files had scattered records, inconsistent formats, duplicate entries, and missing entity relationships unsuited for business intelligence.",
    solution: "Engineered a Medallion Architecture (Bronze → Silver → Gold) in SQL Server with T-SQL stored procedures for extraction, cleaning, deduplication, and Star Schema modeling.",
    keyConcepts: ["Medallion Architecture", "Bronze-Silver-Gold Layers", "Star Schema", "Fact & Dimension Tables", "T-SQL Stored Procedures", "Data Deduplication", "Surrogate Keys"],
    githubUrl: "https://github.com/bahgatzakaria653-dev/sql_data_wharehouse_project",
    githubAvailable: true,
    imageSlots: [
      {
        id: "integration",
        title: "Data Integration: CRM & ERP",
        placeholderPath: "assets/images/dwh-data-integration.png",
        description: "Integration of CRM and ERP source data into the data warehouse pipeline."
      },
      {
        id: "architecture",
        title: "Medallion Data Warehouse Architecture",
        placeholderPath: "assets/images/dwh-architecture-diagram.png",
        description: "Bronze → Silver → Gold architecture showing the transformation of raw source data into an analytics-ready warehouse."
      },
      {
        id: "dataflow",
        title: "End-to-End Data Flow",
        placeholderPath: "assets/images/dwh-data-flow.png",
        description: "The movement of data from raw CRM and ERP sources through the Bronze, Silver, and Gold layers."
      },
      {
        id: "etl",
        title: "ETL & SQL Server Implementation",
        placeholderPath: "assets/images/dwh-etl-methods.png",
        description: "SQL Server ETL workflow and transformation logic used to process the source data."
      },
      {
        id: "star-schema",
        title: "Star Schema Dimensional Model",
        placeholderPath: "assets/images/dwh-star-schema-model.png",
        description: "Gold-layer dimensional model showing Fact and Dimension tables designed for analytical reporting."
      }
    ],
    caseStudy: {
      overview: "This project is an end-to-end Data Warehouse implemented in SQL Server. The primary objective is to transform raw operational data from CRM and ERP systems into structured, cleaned, and analytics-ready data using a Medallion Architecture (Bronze → Silver → Gold).",
      problem: "Source data from CRM and ERP systems contained scattered files, inconsistent records, duplicate transactions, inconsistent formats, and missing relationships between operational entities that were not suitable for analytics.",
      challenges: [
        "Handling scattered source data across disconnected CRM and ERP formats.",
        "Preserving raw source fidelity in Bronze while performing automated deduplication and cleansing in Silver.",
        "Developing Conformed Dimension tables and Fact tables with integer surrogate keys in Gold for analytical speed."
      ],
      approach: "Engineered a disciplined Medallion Architecture inside SQL Server with modular T-SQL stored procedures, structured dimensional modeling (Star Schema), referential integrity enforcement, and clear data lineage.",
      workflow: [
        { step: "1. CRM & ERP Sources", desc: "Raw operational CSV source files from CRM sales and ERP product/customer catalogs." },
        { step: "2. Bronze Layer (Raw)", desc: "Raw source data loaded while preserving original source structure and values as an immutable audit record." },
        { step: "3. Silver Layer (Cleaned)", desc: "Data cleaned, standardized, deduplicated, validated, and transformed using SQL/T-SQL stored procedures." },
        { step: "4. Gold Layer (Analytics-Ready)", desc: "Cleaned data organized into Fact and Dimension tables using a Star Schema for reporting." },
        { step: "5. Analytics Output", desc: "Business-ready data prepared for reporting, ad-hoc queries, and BI analytical use." }
      ],
      dataQualityRules: [
        "Data Cleansing: Trimming whitespace, removing corrupted characters, and normalizing null indicators.",
        "Data Standardization: Unifying disparate country codes, gender flags, and category values across sources.",
        "Deduplication: Resolving duplicate sales and customer records using window functions (ROW_NUMBER).",
        "Data Type Conversion: Safely casting raw strings into explicit integers, decimals, and dates.",
        "Referential Integrity: Enforcing consistent key relationships between sales, products, and customers.",
        "Stored Procedures: Encapsulating all ETL and transformation logic in idempotent, testable SQL Server procedures."
      ],
      results: "The project produces a structured and maintainable SQL Server Data Warehouse that transforms raw CRM and ERP data into cleaned, modeled, and analytics-ready data through a Bronze → Silver → Gold pipeline."
    }
  },
  {
    id: "hospital-data-cleaning",
    title: "Hospital Data Cleaning & Data Quality Pipeline",
    category: "cleaning-quality",
    categoryLabel: "Data Cleaning & Quality",
    shortDescription: "A Python and Pandas data cleaning and data quality pipeline for approximately 1,000,000 hospital records. The project focuses on profiling, cleaning, standardizing, validating, quarantining critical invalid records, and producing a clean output dataset.",
    technologies: ["Python", "Pandas", "Data Cleaning", "Data Quality", "Data Validation"],
    problem: "Raw dataset containing missing values, duplicate entries, placeholder strings ('UNKNOWN', '???', '-'), out-of-range ages, invalid contacts, and inconsistent admission/discharge dates across 1,000,000 records.",
    solution: "Engineered a structured Python & Pandas workflow to profile anomalies, clean and standardize fields, validate business rules, quarantine invalid patient records, and export a validated clean dataset.",
    keyConcepts: ["Data Profiling", "Data Cleansing", "Categorical Standardization", "Patient ID Validation", "Date Chronological Validation", "Data Quarantine"],
    githubUrl: "",
    githubAvailable: false,
    imageSlots: [
      {
        id: "profiling",
        title: "Screenshot 1 — Initial Data Profiling",
        placeholderPath: "assets/images/hospital-initial-profiling.png",
        description: "Initial dataset profiling showing structure, data types, missing values, and duplicate records."
      },
      {
        id: "patient-id-validation",
        title: "Screenshot 2 — Patient ID Validation",
        placeholderPath: "assets/images/hospital-patient-id-validation.png",
        description: "Patient ID validation identifying missing and invalid identifier values."
      },
      {
        id: "date-validation",
        title: "Screenshot 3 — Date Validation",
        placeholderPath: "assets/images/hospital-date-validation.png",
        description: "Date validation identifying future discharge dates and inconsistent admission/discharge date relationships."
      },
      {
        id: "quarantine-output",
        title: "Screenshot 4 — Data Quarantine & Clean Output",
        placeholderPath: "assets/images/hospital-quarantine-clean-output.png",
        description: "Quarantining records with missing patient IDs before generating the clean output dataset."
      }
    ],
    caseStudy: {
      overview: "This project processes approximately 1,000,000 records across 17 columns. The goal is to transform raw hospital data into a cleaner, more consistent, validated dataset through profiling, cleaning, standardization, validation, quarantine of invalid records, and clean output generation.",
      problem: "The raw dataset exhibited severe real-world data quality challenges: missing values across critical columns, duplicate rows, invalid patient IDs, placeholder values ('UNKNOWN', 'unknown', '???', '-'), out-of-range ages, inconsistent categorical values, invalid phones/emails, future discharge dates (43,529 rows), and discharge dates occurring before admission dates (2,457 rows).",
      challenges: [
        "Profiling 1,000,000 rows across 17 columns to uncover hidden data quality defects and placeholder patterns.",
        "Detecting and standardizing disguised placeholders ('???', 'UNKNOWN', '-') into proper missing values.",
        "Validating patient identifiers against format patterns and quantifying invalid strings (5,398 invalid IDs).",
        "Enforcing chronological consistency (discharge date cannot be before admission date) and identifying future dates.",
        "Implementing a transparent quarantine workflow for critical missing patient IDs prior to clean export."
      ],
      approach: "Engineered a disciplined Python and Pandas pipeline covering six operational steps: Data Profiling → Data Cleaning & Standardization → Patient ID Validation → Date Chronological Validation → Quarantine of Critical Invalids → Clean Output Generation.",
      workflow: [
        { step: "1. Data Profiling", desc: "Inspected structure, data types, null sums, and duplicate counts across 1,000,000 rows." },
        { step: "2. Cleaning & Standardization", desc: "Removed whitespace, standardized casing and categories, and normalized disguised placeholder strings." },
        { step: "3. Patient ID Validation", desc: "Validated pattern ^PT\\d{7}$, identifying 5,398 invalid or missing patient IDs." },
        { step: "4. Date Chronological Validation", desc: "Flagged 43,529 future discharge dates and 2,457 records where discharge preceded admission." },
        { step: "5. Data Quarantine", desc: "Isolated records with missing patient IDs into patient_id_null_rows.csv for auditing." },
        { step: "6. Clean Dataset Export", desc: "Exported validated records into hospital_data_clean.csv ready for reliable analytics." }
      ],
      dataQualityRules: [
        "Dataset Profiling: Computed column data types, missing value distributions, and duplicate records.",
        "Placeholder Nullification: Converted 'UNKNOWN', 'unknown', '???', and '-' into standard missing values.",
        "Identifier Validation: Checked patient_id against ^PT\\d{7}$; quantified 5,398 invalid records.",
        "Date Relationship Validation: Enforced rule that discharge date cannot be before admission date (found 2,457 violations).",
        "Future Date Detection: Verified discharge dates against current timestamp (found 43,529 future dates).",
        "Data Quarantine: Extracted missing patient ID records into patient_id_null_rows.csv before generating hospital_data_clean.csv."
      ],
      results: "The project produces a structured data-quality workflow that profiles raw data, identifies data-quality issues, cleans and standardizes values, applies validation rules, separates critical invalid records for quarantine, and produces a clean output dataset."
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PROJECTS_DATA;
}
