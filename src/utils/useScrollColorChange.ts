// // utils/useScrollColorChange.ts
// import { useEffect } from 'react';

// interface Section {
//   id: string;
// }

// const useScrollColorChange = (sections: Section[]) => {
//   useEffect(() => {
//     const scrollContainer = document.getElementById('scroll-container');
//     if (!scrollContainer) {
//       throw new Error('Scroll container element not found');
//     }

//     const options: IntersectionObserverInit = {
//       root: scrollContainer,
//       threshold: 0.5, // Adjust based on when you want the color to change
//     };

//     const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
//       entries.forEach((entry: IntersectionObserverEntry) => {
//         if (entry.isIntersecting) {
//           scrollContainer.classList.remove('scrollbar-thumb-blue', 'scrollbar-thumb-orange');
//           scrollContainer.classList.add(entry.target.dataset.scrollbar);
//         }
//       });
//     }, options);

//     sections.forEach((section: Section) => {
//       const sectionElement = document.getElementById(section.id);
//       if (!sectionElement) {
//         throw new Error(`Section element with id ${section.id} not found`);
//       }
//       observer.observe(sectionElement);
//     });

//     return () => {
//       sections.forEach((section: Section) => {
//         const sectionElement = document.getElementById(section.id);
//         if (sectionElement) {
//           observer.unobserve(sectionElement);
//         }
//       });
//     };
//   }, [sections]);
// };

// export default useScrollColorChange;
