export default function SlidingBar() {
    interface Service {
        type: string;
        icon: string;
    }

    const services : Service[] = [
        { type: "Serving All of Connecticut", icon: "Check"},
        { type: "Trained Specialists", icon: "Check"},
        { type: "Same-Week Availability", icon: "Check"},
        { type: "1,200+ Completed Jobs", icon: "Star"},
        { type: "No Hidden Fees - Ever", icon: "Check"},
        { type: "24h Quote Turnaround", icon: "Star"},
        { type: "4.9 Average Client Rating", icon: "Star"},

    ]

    return (
		<div className="w-full overflow-hidden bg-[#1E1E1E] py-0">
			<div className="flex items-start w-max whitespace-nowrap px-6 animate-marquee">
				{[...services, ...services].map((service, index) => (
					<div key={index} className="flex items-center justify-center gap-3 w-60 py-3 border border-[#333333] text-[#7A7A7A] sub-font text-sm">
						{service.icon === "Check" ? (
							<img src="/public_images/checkmark_icon.png" className="w-4 h-4" />
						) : (
							<img src="/public_images/star_icon.png" className="w-4 h-4" />
						)}
						<span className="opacity-90">{service.type}</span>
					</div>
				))}
			</div>
		</div>
    );
}
