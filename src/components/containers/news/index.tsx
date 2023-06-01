function News(props: any) {

    return (
        <section className="ml-80 h-screen relative overflow-y-auto bg-black/25">
            <div className="w-full h-full flex justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-12">
                    <img src={props.urlImg} className="rounded-full w-96 h-96 border-8 shadow-lg"></img>
                    <h1 className="text-4xl">Bienvenido {props.name + " " + props.lastName}!</h1>
                </div>
            </div>
        </section>
    )
}

export default News
