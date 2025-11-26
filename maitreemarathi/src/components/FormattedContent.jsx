import React from 'react';

export default function FormattedContent({ content }) {
  // Debug logging
  console.log('FormattedContent received:', content ? content.substring(0, 100) : 'null/undefined');
  
  // Function to parse and format the content
  const formatContent = (text) => {
    if (!text || typeof text !== 'string') {
      console.warn('Invalid content type:', typeof text);
      return <p className="text-gray-500 italic">No content available</p>;
    }

    // Check if content has structured formatting
    const hasStructuredContent = text.match(/\*\*[^*]+\*\*:|^[📚🎯📝💡✅🗣️💬🌟❌📖]/m);
    
    // If no structured content, render as simple formatted text
    if (!hasStructuredContent) {
      return (
        <div className="space-y-3">
          {text.split('\n').filter(line => line.trim()).map((line, idx) => {
            // Check for bold text
            const parts = line.split(/(\*\*[^*]+\*\*)/g);
            return (
              <p key={idx} className="leading-relaxed">
                {parts.map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="font-bold text-purple-700">{part.slice(2, -2)}</strong>;
                  }
                  return <span key={i}>{part}</span>;
                })}
              </p>
            );
          })}
        </div>
      );
    }

    // Split by lines
    const lines = text.split('\n');
    const elements = [];
    let currentSection = null;
    let sectionContent = [];

    const renderSection = (title, content, icon, bgColor, textColor) => (
      <div key={`${title}-${Math.random()}`} className={`${bgColor} rounded-lg p-3 sm:p-4 mb-3 border-l-4 ${textColor}`}>
        <div className="flex items-start gap-2 mb-2">
          <span className="text-lg sm:text-xl flex-shrink-0">{icon}</span>
          <h3 className="font-bold text-sm sm:text-base">{title}</h3>
        </div>
        <div className="ml-6 sm:ml-7 space-y-1.5 sm:space-y-2">
          {content.map((line, idx) => {
            // Parse bold text within content
            const parts = line.split(/(\*\*[^*]+\*\*)/g);
            return (
              <p key={idx} className="text-xs sm:text-sm leading-relaxed">
                {parts.map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
                  }
                  return <span key={i}>{part}</span>;
                })}
              </p>
            );
          })}
        </div>
      </div>
    );

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Check for section headers
      if (trimmedLine.match(/^\*\*(.+?)\*\*:?$/)) {
        // Save previous section
        if (currentSection && sectionContent.length > 0) {
          elements.push({ section: currentSection, content: [...sectionContent] });
          sectionContent = [];
        }
        
        // Start new section
        currentSection = trimmedLine.replace(/^\*\*|\*\*:?$/g, '');
      } else if (trimmedLine.match(/^[📚🎯📝💡✅🗣️💬🌟🎯❌📖]/)) {
        // Emoji-prefixed sections
        if (currentSection && sectionContent.length > 0) {
          elements.push({ section: currentSection, content: [...sectionContent] });
          sectionContent = [];
        }
        currentSection = trimmedLine;
      } else if (trimmedLine.match(/^\d+\.\s+\*\*(.+?)\*\*:/)) {
        // Numbered sections like "1. **Exercise**:"
        if (currentSection && sectionContent.length > 0) {
          elements.push({ section: currentSection, content: [...sectionContent] });
          sectionContent = [];
        }
        currentSection = trimmedLine.replace(/^\d+\.\s+\*\*|\*\*:?$/g, '');
      } else if (trimmedLine && trimmedLine !== '---') {
        // Add content to current section
        sectionContent.push(trimmedLine);
      }
    });

    // Add last section
    if (currentSection && sectionContent.length > 0) {
      elements.push({ section: currentSection, content: [...sectionContent] });
    }

    // If no elements were parsed, fall back to simple rendering
    if (elements.length === 0) {
      return (
        <div className="space-y-3">
          {text.split('\n').filter(line => line.trim()).map((line, idx) => (
            <p key={idx} className="leading-relaxed text-gray-800">
              {line}
            </p>
          ))}
        </div>
      );
    }

    // Render sections with appropriate styling
    return elements.map((item, idx) => {
      const section = item.section.toLowerCase();
      
      if (section.includes('topic') || section.includes('📚')) {
        return renderSection(item.section, item.content, '📚', 'bg-blue-50', 'border-blue-400');
      } else if (section.includes('level') || section.includes('🎯')) {
        return renderSection(item.section, item.content, '🎯', 'bg-purple-50', 'border-purple-400');
      } else if (section.includes('exercise') || section.includes('📝')) {
        return renderSection(item.section, item.content, '📝', 'bg-green-50', 'border-green-400');
      } else if (section.includes('hint') || section.includes('💡')) {
        return renderSection(item.section, item.content, '💡', 'bg-yellow-50', 'border-yellow-400');
      } else if (section.includes('answer') || section.includes('✅')) {
        return renderSection(item.section, item.content, '✅', 'bg-emerald-50', 'border-emerald-400');
      } else if (section.includes('pronunciation') || section.includes('🗣️')) {
        return renderSection(item.section, item.content, '🗣️', 'bg-pink-50', 'border-pink-400');
      } else if (section.includes('conversation') || section.includes('💬')) {
        return renderSection(item.section, item.content, '💬', 'bg-indigo-50', 'border-indigo-400');
      } else if (section.includes('cultural') || section.includes('🌟')) {
        return renderSection(item.section, item.content, '🌟', 'bg-orange-50', 'border-orange-400');
      } else if (section.includes('practice') || section.includes('tip')) {
        return renderSection(item.section, item.content, '🎯', 'bg-teal-50', 'border-teal-400');
      } else if (section.includes('usage')) {
        return renderSection(item.section, item.content, '💼', 'bg-cyan-50', 'border-cyan-400');
      } else if (section.includes('mistake') || section.includes('error') || section.includes('❌')) {
        return renderSection(item.section, item.content, '❌', 'bg-red-50', 'border-red-400');
      } else if (section.includes('grammar') || section.includes('📖')) {
        return renderSection(item.section, item.content, '📖', 'bg-violet-50', 'border-violet-400');
      } else {
        return renderSection(item.section, item.content, '📌', 'bg-gray-50', 'border-gray-400');
      }
    });
  };

  try {
    const formattedContent = formatContent(content);
    return (
      <div className="space-y-3">
        {formattedContent || <p className="text-gray-500 italic">Unable to display content</p>}
      </div>
    );
  } catch (error) {
    console.error('Error formatting content:', error);
    return (
      <div className="space-y-3">
        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
          {content}
        </p>
      </div>
    );
  }
}
