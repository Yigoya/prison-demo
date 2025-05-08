import { useEffect, useRef } from 'react';

type StudentDistributionChartProps = {
  inmateStudents: number;
  regularStudents: number;
};

const StudentDistributionChart = ({ inmateStudents, regularStudents }: StudentDistributionChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Draw pie chart
    const total = inmateStudents + regularStudents;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    
    // Calculate angles for each segment
    const inmateAngle = (inmateStudents / total) * Math.PI * 2;
    const regularAngle = (regularStudents / total) * Math.PI * 2;
    
    // Draw inmate segment
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, 0, inmateAngle);
    ctx.fillStyle = 'rgba(29, 68, 156, 0.7)';
    ctx.fill();
    
    // Draw regular segment
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, inmateAngle, inmateAngle + regularAngle);
    ctx.fillStyle = 'rgba(212, 175, 55, 0.7)';
    ctx.fill();
    
    // Draw legend
    const legendX = centerX - radius;
    const legendY = centerY + radius + 20;
    
    // Inmate legend
    ctx.fillStyle = 'rgba(29, 68, 156, 0.7)';
    ctx.fillRect(legendX, legendY, 15, 15);
    ctx.fillStyle = '#4b5563';
    ctx.font = '12px Arial';
    ctx.fillText(`Inmate Students: ${inmateStudents} (${Math.round((inmateStudents / total) * 100)}%)`, legendX + 20, legendY + 12);
    
    // Regular legend
    ctx.fillStyle = 'rgba(212, 175, 55, 0.7)';
    ctx.fillRect(legendX, legendY + 25, 15, 15);
    ctx.fillStyle = '#4b5563';
    ctx.fillText(`Regular Students: ${regularStudents} (${Math.round((regularStudents / total) * 100)}%)`, legendX + 20, legendY + 37);
    
    // Draw inner circle for donut chart effect
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    // Add text in center
    ctx.fillStyle = '#1d449c';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${total}`, centerX, centerY - 10);
    ctx.font = '12px Arial';
    ctx.fillText('Total Students', centerX, centerY + 15);
    
  }, [inmateStudents, regularStudents]);
  
  return (
    <div className="h-64 w-full">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default StudentDistributionChart;