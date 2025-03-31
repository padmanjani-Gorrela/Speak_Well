import React, { useState, useEffect } from 'react';
import './ResourceLibrary.css';
import Navbar from '../navbar/Navbar1';

// Mock data - in a real app this would come from an API
const MOCK_RESOURCES = [
  {
    id: 1,
    title: "Introduction to Articulation Therapy",
    type: "video",
    category: "Articulation",
    skillLevel: "beginner",
    language: "English",
    description: "A comprehensive introduction to the principles of articulation therapy and how it works.",
    tags: ["articulation", "introduction", "speech basics"],
    thumbnail: "https://static.wixstatic.com/media/e1169a_908e8252678d4ea588d43d446ef26872~mv2.jpg/v1/fill/w_568,h_384,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/e1169a_908e8252678d4ea588d43d446ef26872~mv2.jpg",
    duration: "15:30"
  },
  {
    id: 2,
    title: "Oral Motor Exercise Guide",
    type: "exercise",
    category: "Oral Motor Skills",
    skillLevel: "intermediate",
    language: "English",
    description: "A guided exercise to help develop oral motor skills for improved speech production.",
    tags: ["oral motor", "exercises", "speech practice"],
    thumbnail: "https://cdn11.bigcommerce.com/s-ghsrgu/product_images/uploaded_images/z-vibe-techniques.jpg",
    duration: "10:00"
  },
  {
    id: 3,
    title: "Understanding Childhood Apraxia of Speech",
    type: "article",
    category: "Apraxia",
    skillLevel: "advanced",
    language: "Spanish",
    description: "An in-depth look at how childhood apraxia affects speech production and development.",
    tags: ["apraxia", "childhood", "motor planning"],
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1FXCibW4V64ZTqP41PU_TGI9mz4jcQ0x1-g&s",
    readTime: "8 min"
  },
  {
    id: 4,
    title: "Fluency Enhancement Techniques",
    type: "interactive",
    category: "Stuttering",
    skillLevel: "beginner",
    language: "French",
    description: "Interactive tools to help manage and track stuttering symptoms.",
    tags: ["fluency", "stuttering", "self-help"],
    thumbnail: "https://images.squarespace-cdn.com/content/v1/61b1023aa2b9374a5f778fa5/e3c5e418-a8cd-4ecb-8c8c-9903fba180a8/Understanding+Fluency+Disorder+in+Adults.jpeg"
  },
  {
    id: 5,
    title: "Phonological Processes Overview",
    type: "video",
    category: "Phonology",
    skillLevel: "intermediate",
    language: "English",
    description: "Learn about the key concepts in phonological process therapy for speech sound disorders.",
    tags: ["phonology", "speech sounds", "development"],
    thumbnail: "https://pubs.asha.org/cms/asset/d46c0517-65db-4769-a30c-6435bed809eb/ajslp_25_2_172fig3.jpg",
    duration: "22:15"
  },
  {
    id: 6,
    title: "Voice Therapy Exercises",
    type: "exercise",
    category: "Voice Disorders",
    skillLevel: "beginner",
    language: "German",
    description: "Simple voice therapy exercises to improve vocal quality and health.",
    tags: ["voice", "resonance", "vocal hygiene"],
    thumbnail: "https://i.ytimg.com/vi/eC_BFfTzhYE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCJOBWdUXPpDVdu7brnBeOfYnyRpg",
    duration: "5:45"
  }
];

// Resource type icons
const ResourceTypeIcon = ({ type }) => {
  switch (type) {
    case 'video':
      return <span className="resource-lib-icon resource-lib-video-icon"></span>;
    case 'exercise':
      return <span className="resource-lib-icon resource-lib-exercise-icon"></span>;
    case 'article':
      return <span className="resource-lib-icon resource-lib-article-icon"></span>;
    case 'interactive':
      return <span className="resource-lib-icon resource-lib-interactive-icon"></span>;
    default:
      return <span className="resource-lib-icon resource-lib-default-icon"></span>;
  }
};

const ResourceLibrary = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: [],
    category: [],
    skillLevel: [],
    language: []
  });

  // Initialize with mock data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setResources(MOCK_RESOURCES);
      setFilteredResources(MOCK_RESOURCES);
    }, 500);
  }, []);

  // Extract unique filter options from resources
  const getFilterOptions = (field) => {
    const options = new Set(resources.map(resource => resource[field]));
    return Array.from(options);
  };

  // Handle search and filter changes
  useEffect(() => {
    let results = resources;
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        resource => 
          resource.title.toLowerCase().includes(term) || 
          resource.description.toLowerCase().includes(term) ||
          resource.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Apply filters
    Object.entries(filters).forEach(([key, selectedValues]) => {
      if (selectedValues.length > 0) {
        results = results.filter(resource => 
          selectedValues.includes(resource[key])
        );
      }
    });
    
    setFilteredResources(results);
  }, [searchTerm, filters, resources]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const updatedFilter = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter(item => item !== value)
        : [...prevFilters[filterType], value];
      
      return {
        ...prevFilters,
        [filterType]: updatedFilter
      };
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      type: [],
      category: [],
      skillLevel: [],
      language: []
    });
  };

  // Filter component
  const FilterSection = ({ title, filterType, options }) => (
    <div className="resource-lib-filter-section">
      <h3>{title}</h3>
      <div className="resource-lib-filter-options">
        {options.map(option => (
          <label key={option} className="resource-lib-filter-option">
            <input
              type="checkbox"
              checked={filters[filterType].includes(option)}
              onChange={() => handleFilterChange(filterType, option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <>
    <Navbar/>
    <div className="resource-lib-container">
      <header className="resource-lib-header">
        <h1>Therapy Resource Library</h1>
        <p>Browse our comprehensive collection of therapy materials, tools, and exercises</p>
      </header>

      <div className="resource-lib-search-container">
        <input
          type="text"
          placeholder="Search by title, description, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="resource-lib-search-input"
        />
      </div>

      <div className="resource-lib-content">
        <aside className="resource-lib-filters-panel">
          <div className="resource-lib-filters-header">
            <h2>Filters</h2>
            <button onClick={resetFilters} className="resource-lib-reset-button">Reset All</button>
          </div>

          <FilterSection 
            title="Resource Type" 
            filterType="type" 
            options={getFilterOptions('type')} 
          />
          
          <FilterSection 
            title="Therapy Category" 
            filterType="category" 
            options={getFilterOptions('category')} 
          />
          
          <FilterSection 
            title="Skill Level" 
            filterType="skillLevel" 
            options={getFilterOptions('skillLevel')} 
          />
          
          <FilterSection 
            title="Language" 
            filterType="language" 
            options={getFilterOptions('language')} 
          />
        </aside>

        <main className="resource-lib-resources-grid">
          <div className="resource-lib-results-info">
            <p>Showing {filteredResources.length} of {resources.length} resources</p>
          </div>
          
          {filteredResources.length === 0 ? (
            <div className="resource-lib-no-results">
              <h3>No resources found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <div className="resource-lib-resources-list">
              {filteredResources.map(resource => (
                <div key={resource.id} className="resource-lib-resource-card">
                  <div className="resource-lib-resource-thumbnail">
                    <img src={resource.thumbnail} alt={resource.title} />
                    <div className="resource-lib-resource-type-badge">
                      <ResourceTypeIcon type={resource.type} />
                      {resource.type}
                    </div>
                  </div>
                  <div className="resource-lib-resource-details">
                    <h3>{resource.title}</h3>
                    <p className="resource-lib-resource-description">{resource.description}</p>
                    <div className="resource-lib-resource-meta">
                      <span className="resource-lib-category">{resource.category}</span>
                      <span className="resource-lib-skill-level">{resource.skillLevel}</span>
                      <span className="resource-lib-language">{resource.language}</span>
                      {resource.duration && <span className="resource-lib-duration">{resource.duration}</span>}
                      {resource.readTime && <span className="resource-lib-read-time">{resource.readTime}</span>}
                    </div>
                    <div className="resource-lib-resource-tags">
                      {resource.tags.map(tag => (
                        <span key={tag} className="resource-lib-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="resource-lib-resource-actions">
                    <button className="resource-lib-action-button resource-lib-primary">View Resource</button>
                    <button className="resource-lib-action-button resource-lib-secondary">Save</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
    </>
  );
};

export default ResourceLibrary;