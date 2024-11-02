import { cn } from "../../lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import getWidth from "../../lib/getWidth";

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface FloatingDockProps {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}

export const FloatingDockHorizontal: React.FC<FloatingDockProps> = ({
  items,
  desktopClassName,
}) => {
  return (
    <FloatingDockDesktop items={items} className={desktopClassName} />
  );
};

interface DockDesktopProps {
  items: DockItem[];
  className?: string;
}

const FloatingDockDesktop: React.FC<DockDesktopProps> = ({
  items,
  className,
}) => {
  const mouseX = useMotionValue(Infinity);
  const screenWidth = getWidth().width;

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 gap-4 items-end rounded-full bg-black p-4 dark:bg-neutral-900 px-4 pb-3",
        className
      )}
    >
      {items.map((item) => (
        screenWidth > 420 ? (
          <IconContainer 
            mouseX={mouseX} 
            key={item.title} 
            {...item} 
          />
        ) : (
          <SimpleIconContainer 
            key={item.title} 
            {...item} 
          />
        )
      ))}
    </motion.div>
  );
};

const SimpleIconContainer: React.FC<Omit<DockItem, 'href'> & { href?: string }> = ({
  title,
  icon,
  href = "#"
}) => {
  
  return (
    <Link to={href}>
      <div className="aspect-square h-10 w-10 rounded-full bg-[--secondary--] dark:bg-neutral-800 flex items-center justify-center">
        <div className="h-5 w-5 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </Link>
  );
};

interface IconContainerProps extends DockItem {
  mouseX: MotionValue;
}

const IconContainer: React.FC<IconContainerProps> = ({
  mouseX,
  title,
  icon,
  href,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Link to={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-[--secondary--] dark:bg-neutral-800 flex items-center justify-center relative"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 50, x: "-50%" }}
              animate={{ opacity: 1, y: 120, x: "-50%" }}
              exit={{ opacity: 0, y: 50, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
};