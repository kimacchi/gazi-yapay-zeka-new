export default function Page({ params }: { params: { pid: string } }) {
    // ! This page is for admins only.
    return (
      <div>
        {params.pid} edit
      </div>
    );
  }
  